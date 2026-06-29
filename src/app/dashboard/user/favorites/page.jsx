import { getFavoriteRecipes } from "@/lib/api/recipes";
import { getUserSession } from "@/lib/core/session";
import UserFavoriteRecipes from "./FavoritePage";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Flavor Flow - Dashboard - Favorites",
  description: "View your favorite recipes on Flavor Flow.",
};

const FavoritePage = async () => {
  const user = await getUserSession();

  if (!user || user?.role !== "user") {
    redirect("/unauthorized");
  }
  // Safe fallback if user session is not present
  const favoriteRecipes = user?.id ? await getFavoriteRecipes(user.id) : [];
  const favoriteRecipesData = favoriteRecipes?.favoriteRecipes || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <UserFavoriteRecipes
        favoriteRecipes={favoriteRecipesData}
        userId={user?.id}
      />
    </div>
  );
};

export default FavoritePage;
