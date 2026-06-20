import { getLikeStatus, getSingleRecipe } from "@/components/lib/api/recipes";
import RecipeDetails from "./RecipeDetails";
import { getUserSession } from "@/components/lib/core/session";

export default async function RecipePage({ params }) {
  const { id } = await params;
  const user = await getUserSession();
  const recipe = await getSingleRecipe(id);
  const likeStatus = await getLikeStatus(recipe._id, user?.id);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-[#0b0f19] flex items-center justify-center text-center p-4">
        <div className="max-w-md bg-white dark:bg-[#131b2e] p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
          <h2 className="text-2xl font-bold text-rose-500 mb-2">
            Recipe Not Found!
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            দুঃখিত, এই রেসিপিটি খুঁজে পাওয়া যায়নি অথবা ডাটাবেস থেকে রিমুভ করা
            হয়েছে।
          </p>
        </div>
      </div>
    );
  }

  return (
    <RecipeDetails
      currentUser={user}
      likeStatus={likeStatus}
      recipeData={recipe}
    />
  );
}
