import { getUserSession } from "@/lib/core/session";
import UpdateRecipeForm from "./UpdateRecipeForm";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Flavor Flow - Dashboard - Update Recipe",
  description: "Update your existing recipe on Flavor Flow.",
};

export default async function RecipeUpdatePage({ params }) {

 const user = await getUserSession();

  if (!user || user?.role !== "user") {
    redirect("/unauthorized");
  }

  // Next.js 15 requires awaiting dynamic route params
  const { updateRecipe } = await params;

  return <UpdateRecipeForm recipeId={updateRecipe} />;
}
