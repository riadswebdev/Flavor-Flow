import { getUserSession } from "@/lib/core/session";
import AddRecipeForm from "./addRecipeForm";
import { redirect } from "next/navigation";
import { getRecipesByUserId } from "@/lib/api/recipes";

export const metadata = {
  title: "Flavor Flow - Dashboard - Add Recipe",
  description: "Add a new recipe to Flavor Flow.",
};

const AddRecipePage = async () => {
  const user = await getUserSession();
  const usersRecipes = await getRecipesByUserId(user?.id);
  console.log(usersRecipes);
  if (!user) {
    redirect("/login");
  }

  return <AddRecipeForm loggedInUser={user} />;
};

export default AddRecipePage;
