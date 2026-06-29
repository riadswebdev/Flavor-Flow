import { updateSubscriptionStatusAndSaveTransaction } from "@/lib/actions/payment";
import Link from "next/link";
import React from "react";
import Stripe from "stripe";

// Initialize Stripe Client with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Icon Components using lightweight SVGs
const CheckCircleIcon = ({ className = "w-12 h-12" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CrownIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.5 8.25h9m-9 3h9m-9 3h9m-11.25-6a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h16.5a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H3.75z"
    />
  </svg>
);

const ReceiptIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);

const MailIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const CreditCardIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

const PlusIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const UtensilsIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  </svg>
);

const SparklesIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const XCircleIcon = ({ className = "w-12 h-12" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const SuccessCard = ({ children }) => (
  <div className="w-full max-w-2xl rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-[#0c0d12]/80 backdrop-blur-xl shadow-2xl p-6 md:p-8 overflow-hidden relative transition-all duration-300">
    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-orange-500/20 to-transparent rounded-bl-full pointer-events-none" />
    {children}
  </div>
);

const ErrorCard = ({ children }) => (
  <div className="w-full max-w-xl rounded-3xl border-2 border-red-500/20 bg-white/70 dark:bg-[#150a0a]/80 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
    {children}
  </div>
);

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="relative min-h-[90vh] flex items-center justify-center py-16 px-4 bg-zinc-50 dark:bg-[#0a0a0c]">
        <ErrorCard>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 mb-6 animate-bounce">
              <XCircleIcon />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-red-600 dark:text-red-400 tracking-tight mb-3">
              Payment Verification Failed
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-6 max-w-md">
              No transaction token was provided. We couldn&apos;t locate your
              Stripe Checkout Session.
            </p>
            <div className="w-full bg-red-500/5 rounded-2xl p-4 border border-red-500/10 text-left text-xs text-red-500/80 font-mono mb-6">
              Code: MISSING_SESSION_ID
            </div>
            <a
              href="/subscriptions"
              className="w-full h-12 rounded-2xl font-bold flex items-center justify-center gap-2 text-white bg-linear-to-r from-red-500 to-rose-600 hover:opacity-95 transition-opacity"
            >
              Return to Subscriptions
            </a>
          </div>
        </ErrorCard>
      </div>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const {
    status,
    metadata,
    amount_total,
    id: transactionId,
    payment_method_types,
    customer_details,
  } = session;

  const customerEmail = customer_details?.email || "N/A";

  const amountTotal = amount_total ? amount_total / 100 : 0;

  const dateString = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const planId = metadata?.planId || "premium";

  const payload = {
    planId: planId,
    planName:
      metadata?.planName ||
      (planId === "lifetime" ? "Lifetime Plan" : "Premium Plan"),
    transactionId: transactionId,
    amount: amount_total,
    paymentStatus: "paid",
    userId: metadata?.userId || "unknown",
    userEmail: customerEmail,
    paymentMethod: payment_method_types?.[0] || "card",
  };

  if (status === "complete") {
    await updateSubscriptionStatusAndSaveTransaction(payload);

    return (
      <div className="relative min-h-[90vh] flex items-center justify-center py-16 px-4 bg-zinc-50 dark:bg-[#0a0a0c] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 md:w-150 h-87.5 md:h-150 bg-orange-500/10 dark:bg-orange-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-500/10 dark:bg-rose-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <SuccessCard>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-linear-to-br from-emerald-100 to-green-100 dark:from-emerald-950/40 dark:to-green-950/40 text-emerald-600 dark:text-emerald-400 mb-5 shadow-lg shadow-emerald-500/10 animate-pulse">
              <CheckCircleIcon />
            </div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">
              Payment Successful! 🎉
            </h1>

            <p className="text-sm md:text-base font-semibold text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-rose-500">
              Welcome to FlavorFlow Premium.
            </p>

            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 max-w-sm">
              Your Premium Membership has been activated. Thank you for your
              support!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-zinc-100/40 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/40 rounded-2xl p-4 flex flex-col justify-between">
              <span className="text-xs text-zinc-400 uppercase font-bold tracking-wider">
                Plan Name
              </span>
              <div className="flex items-center gap-2 mt-1">
                <CrownIcon className="text-orange-500" />
                <span className="font-extrabold text-zinc-800 dark:text-zinc-100">
                  {planId === "lifetime" ? "Lifetime Plan" : "Premium Plan"}
                </span>
              </div>
            </div>
            <div className="bg-zinc-100/40 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-zinc-800/40 rounded-2xl p-4 flex flex-col justify-between">
              <span className="text-xs text-zinc-400 uppercase font-bold tracking-wider">
                Payment Status
              </span>
              <div className="mt-1">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 leading-5">
                  Paid
                </span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-100/50 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-800/20 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-zinc-500">
                <MailIcon />
                <span>Customer Email</span>
              </div>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {customerEmail}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-zinc-500">
                <CreditCardIcon />
                <span>Total Charged</span>
              </div>
              <span className="font-bold text-zinc-900 dark:text-white">
                ${amountTotal.toFixed(2)} USD
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-zinc-500">
                <ReceiptIcon />
                <span>Transaction ID</span>
              </div>
              <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400 max-w-45 md:max-w-none truncate">
                {transactionId}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-zinc-500">
                <CalendarIcon />
                <span>Payment Date</span>
              </div>
              <span className="text-zinc-700 dark:text-zinc-300">
                {dateString}
              </span>
            </div>
          </div>

          <div className="my-6 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-4 flex gap-3">
            <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 self-start">
              <SparklesIcon />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                Premium Benefits Activated
              </h4>
              <ul className="text-xs text-zinc-500 dark:text-zinc-400 list-disc pl-4 space-y-1 mt-1">
                <li>Your Premium Membership has been activated.</li>
                <li>You can now upload unlimited recipes.</li>
                <li>Enjoy all Premium features.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full border-t border-zinc-200/60 dark:border-zinc-800/60 pt-6">
            <Link
              href="/recipes"
              className="flex-1 h-12 rounded-2xl font-bold border border-zinc-200/60 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <UtensilsIcon /> Browse Recipes
            </Link>

            <Link
              href="/dashboard/user/add-recipe"
              className="flex-1 h-12 rounded-2xl font-bold text-orange-500 dark:text-orange-400 border border-orange-500/20 bg-orange-500/5 hover:bg-orange-500/10 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <PlusIcon /> Add Recipe
            </Link>

            <Link
              href="/dashboard/user"
              className="flex-1 h-12 rounded-2xl font-bold text-white bg-linear-to-r from-orange-500 to-rose-600 hover:opacity-95 flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-orange-500/20"
            >
              Go to Dashboard <ArrowRightIcon />
            </Link>
          </div>
        </SuccessCard>
      </div>
    );
  }

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-16 px-4 bg-zinc-50 dark:bg-[#0a0a0c]">
      <ErrorCard>
        <div className="flex flex-col items-center text-center">
          <div className="p-4 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 mb-6">
            <XCircleIcon />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-red-600 dark:text-red-400 tracking-tight mb-3">
            Payment Verification Failed
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-6 max-w-md">
            We couldn&apos;t verify your payment. Status is: {status}. Please
            contact support if money was deducted.
          </p>
          <Link
            href="/"
            className="w-full h-12 rounded-2xl font-bold flex items-center justify-center gap-2 text-white bg-linear-to-r from-red-500 to-rose-600 hover:opacity-95 transition-opacity shadow-md"
          >
            Return Home
          </Link>
        </div>
      </ErrorCard>
    </div>
  );
}
