import { redirect } from "next/navigation";
import { saveRecipePurchaseTransaction } from "@/lib/actions/payment";
import Stripe from "stripe";
import Link from "next/link";
import Toast from "../../success/Toast";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const metadata = {
  title: "Recipe Purchase Success",
  description: "Thank you for your purchase! Your recipe is now available.",
};

function PaymentErrorCard({ message }) {
  return (
    <div className="min-h-[90vh] flex items-center justify-center py-16 px-4 bg-zinc-50 dark:bg-[#0a0a0c]">
      <div className="w-full max-w-xl rounded-3xl border-2 border-red-500/20 bg-white/70 dark:bg-[#150a0a]/80 backdrop-blur-xl p-6 md:p-8 shadow-2xl text-center">
        <h2 className="text-2xl md:text-3xl font-black text-red-600 dark:text-red-400 tracking-tight mb-3">
          Payment Verification Failed
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
          {message}
        </p>
        <Link
          href="/"
          className="w-full h-12 rounded-2xl font-bold flex items-center justify-center gap-2 text-white bg-linear-to-r from-red-500 to-rose-600 hover:opacity-95 transition-opacity shadow-md"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default async function RecipePurchaseSuccess({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <PaymentErrorCard message="No transaction token was provided. We couldn't locate your Stripe Checkout Session." />
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  const {
    status,
    metadata,
    amount_total,
    id: transactionId,
    payment_method_types,
    customer_details: { email: customerEmail },
    mode,
  } = session;

  const payload = {
    transactionId: transactionId,
    amount: amount_total / 100, // Convert cents to dollars
    paymentStatus: "paid",
    recipeId: metadata?.recipeId || "unknown",
    userId: metadata?.userId || "unknown",
    recipeName: metadata?.recipeName || "unknown",
    recipeImage: metadata?.recipeImage || "unknown",
    userEmail: customerEmail,
    paymentMethod: payment_method_types?.[0] || "card",
    mode: mode || "payment",
  };

  // Stripe's checkout session status is "complete" on success (not "success").
  if (status === "complete") {
    await saveRecipePurchaseTransaction(payload);

    <Toast recipeName={metadata?.recipeName} />;
    // redirect("/");
  }

  return (
    <PaymentErrorCard
      message={`We couldn't verify your payment. Status is: ${status}. Please contact support if money was deducted.`}
    />
  );
}
