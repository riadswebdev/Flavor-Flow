"use server";

import { revalidatePath } from "next/cache";

export const refreshRoute = async (path) => {
  if (!path) {
    throw new Error("Path is required for revalidation");
  }
  revalidatePath(path);
};
