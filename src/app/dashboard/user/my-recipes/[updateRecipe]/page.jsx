import UpdateRecipeForm from "./UpdateRecipeForm";

export default async function RecipeUpdatePage({ params }) {
  // Next.js 15 requires awaiting dynamic route params
  const { updateRecipe } = await params;

  return <UpdateRecipeForm recipeId={updateRecipe} />;
}
