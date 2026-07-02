import { getAllRecipes } from "@/lib/api/recipes";
import ManageRecipesPage from "./ManageRecipes";
import { recipeFeatureUnFeatured } from "@/lib/actions/recipe";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Manage Recipes - FlavorFlow Admin Dashboard",
  description: "Admin dashboard for managing recipes on FlavorFlow.",
};

const ManageRecipe = async () => {
  const user = await getUserSession();

  if (!user || user?.role !== "admin") {
    redirect("/unauthorized");
  }

  const allRecipes = await getAllRecipes();
  return (
    <ManageRecipesPage
      allRecipes={allRecipes}
      recipeFeatureUnFeatured={recipeFeatureUnFeatured}
    />
  );
};

export default ManageRecipe;
