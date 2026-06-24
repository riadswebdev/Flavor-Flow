import { getFavoriteRecipes } from "@/lib/api/recipes";
import { getUserSession } from "@/lib/core/session";
import UserFavoriteRecipes from "./FavoritePage";
 // Updated to match client filename

const FavoritePage = async () => {
  const user = await getUserSession();

  // Safe fallback if user session is not present
  const favoriteRecipes = user?.id ? await getFavoriteRecipes(user.id) : [];

  return (
    <div className="container mx-auto py-8 px-4">
      <UserFavoriteRecipes
        favoriteRecipes={favoriteRecipes}
        userId={user?.id}
      />
    </div>
  );
};

export default FavoritePage;
