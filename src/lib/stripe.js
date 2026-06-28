import "server-only";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error(
    "STRIPE_SECRET_KEY is missing from your environment variables!",
  );
}
export const stripe = new Stripe(secretKey);

export const PLAN_PRICE_ID = {
  "premium": "price_1TmoztFAb7tGMqTnbWdJKQai",
  "lifetime": "price_1TmqxZFAb7tGMqTnw6O90voJ",
};