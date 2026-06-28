// import { NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { PLAN_PRICE_ID, stripe } from "@/lib/stripe";

// export async function POST(request) {
//   try {
//     const headersList = await headers();
//     const origin = headersList.get("origin");

//     const formData = await request.formData();
//     const planId = formData.get("priceId");
//     const priceId = PLAN_PRICE_ID[planId];
//     console.log("planId ? premium : lifetime", planId);
//     console.log("priceId", priceId);
//     const user = {
//       name: "MD RIAD SHEKH",
//       email: "riadmia@gmail.com",
//       emailVerified: false,
//       image: "https://i.ibb.co/svBbR0HQ/profile-photoaidcom-cropped-1-1.png",
//       createdAt: new Date("2026-06-22T08:41:40.000Z"),
//       updatedAt: new Date("2026-06-22T08:43:38.000Z"),
//       role: "admin",
//       isBlocked: false,
//       plan: "free",
//       id: "6a38f5444247b059dc3279c5",
//     };
//     console.log(user);
//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       customer_email: user?.email,
//       payment_method_types: ["card"],
//       billing_address_collection: "auto",
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       mode: "subscription",
//       metadata: {

//       },
//       success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
//     });
//     return NextResponse.redirect(session.url, 303);
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PLAN_PRICE_ID, stripe } from "@/lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

    const formData = await request.formData();
    // Accept either planId or priceId from the request form
    const planId =
      formData.get("planId") || formData.get("priceId") || "premium";
    const priceId = PLAN_PRICE_ID[planId];

    console.log("planId selected:", planId);
    console.log("priceId resolved:", priceId);

    // Retrieve logged-in user details
    let user = await getUserSession();

    // Production safety fallback context if no live session is detected
    if (!user) {
      user = {
        name: "MD RIAD SHEKH",
        email: "riadmia@gmail.com",
        emailVerified: false,
        image: "https://i.ibb.co/svBbR0HQ/profile-photoaidcom-cropped-1-1.png",
        createdAt: new Date("2026-06-22T08:41:40.000Z"),
        updatedAt: new Date("2026-06-22T08:43:38.000Z"),
        role: "admin",
        isBlocked: false,
        plan: "free",
        id: "6a38f5444247b059dc3279c5",
      };
    }
    console.log("Logged-in user:", user);

    // Determine Checkout Mode dynamically:
    // subscription for recurring billing plans, payment for one-time Lifetime checkout
    const checkoutMode = planId === "lifetime" ? "payment" : "subscription";

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
      mode: checkoutMode,
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