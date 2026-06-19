import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
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
        default: "user",
      },
      isBlocked: {
        default: false,
      },
      plan: {
        default: "free",
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
