import { redirect } from "next/navigation";
import { getRecipesByUserId } from "@/lib/api/recipes";
import { getUserSession } from "@/lib/core/session";
import UserTotalRecipe from "./UserTotalRecipe";

const UsersTotalRecipesPage = async () => {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  const usersRecipes = await getRecipesByUserId(user.id);
  const initialRecipes = usersRecipes?.data || [];

  return <UserTotalRecipe initialRecipes={initialRecipes} userId={user.id} />;
};

export default UsersTotalRecipesPage;
