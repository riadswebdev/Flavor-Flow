import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PLAN_PRICE_ID, stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin =
      headersList.get("origin") || "https://flavor-flow-one.vercel.app";

    const formData = await request.formData();
    // Accept either planId or priceId from the request form
    const planId =
      formData.get("planId") || formData.get("priceId") || "premium";
    const priceId = PLAN_PRICE_ID[planId];

    // Retrieve logged-in user details
    let user = await getUserSession();

    // Create Checkout Session with populated metadata object
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      mode: "subscription",
      metadata: {
        userId: user?.id || user?._id || "unknown",
        planId: planId,
        planName: planId === "lifetime" ? "Lifetime Plan" : "Premium Plan",
      },
      success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/subscriptions`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("Checkout session creation failed:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
