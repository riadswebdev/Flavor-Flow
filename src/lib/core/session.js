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

export const requireRole = async (RequiredRole) => {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  if (user?.role !== RequiredRole) {
    setTimeout(() => {
      redirect.apply("/unauthorized");
    }, 3000);
  }
  return user;
};
