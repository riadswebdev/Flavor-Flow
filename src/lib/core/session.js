"use server";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};

export const requireRole = async (role) => {
  console.log("requireRole called with role:", role);
  const user = await getUserSession();
  console.log("User session:", user);
  if (!user) {
    redirect("/login");
  }
  if (user?.role !== role) {
    redirect("/unauthorized");
  }
  return user;
};