import { getUserSession } from "@/lib/core/session";
import AddRecipeForm from "./addRecipeForm";
import { redirect } from "next/navigation";

const AddRecipePage = async () => {
  const user = await getUserSession();
  if (!user) {
    redirect("/login");
  }

  return <AddRecipeForm loggedInUser={user} />;
};

export default AddRecipePage;
