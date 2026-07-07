import PopularRecipes from "@/components/home/PopularRecipes";
import { getFeatureAndPopularRecipe } from "@/lib/api/recipes";

const PopularPage = async () => {
  const recipes = await getFeatureAndPopularRecipe();
  const popularRecipes = recipes?.popularRecipes;
  return <PopularRecipes recipes={popularRecipes} />;
};

export default PopularPage;
