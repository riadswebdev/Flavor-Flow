import UpdateRecipeForm from "./UpdateRecipeForm";

export const metadata = {
  title: "Flavor Flow - Dashboard - Update Recipe",
  description: "Update your existing recipe on Flavor Flow.",
};

export default async function RecipeUpdatePage({ params }) {
  // Next.js 15 requires awaiting dynamic route params
  const { updateRecipe } = await params;

  return <UpdateRecipeForm recipeId={updateRecipe} />;
}
