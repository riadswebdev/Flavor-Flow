import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("flavorflow");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "https://flavor-flow-one.vercel.app",
  socialProviders: {
    google: {
      clientId: process.env.Client_ID,
      clientSecret: process.env.Client_secret,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: "user",
      },
      isBlocked: {
        defaultValue: false,
      },
      planId: {
        defaultValue: "free",
      },
      expireAt: {
        defaultValue: null,
      },
      recipeLimit: {
        defaultValue: 2,
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
