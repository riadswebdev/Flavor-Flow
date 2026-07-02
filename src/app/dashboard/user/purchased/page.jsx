import { getUserSession } from "@/lib/core/session";
import MyPurchasedRecipes from "./PurchasedRecipes";
import { getTransactionsByUserId } from "@/lib/api/transaction";

const metadata = {
  title: "Purchased Recipes- Dashboard-User",
  description: "View your purchased recipes",
};

const PurchasedRecipesPage = async () => {
  const user = await getUserSession();
  const purchasedRecipes = (await getTransactionsByUserId(user?.id)) || [];
  const hasPurchasedRecipes = purchasedRecipes?.data || purchasedRecipes;

  return <MyPurchasedRecipes purchasedRecipes={hasPurchasedRecipes} />;
};

export default PurchasedRecipesPage;
