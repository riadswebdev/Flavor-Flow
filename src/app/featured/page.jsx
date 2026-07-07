import FeaturedRecipes from "@/components/home/FeaturedRecipes";
import { getFeatureAndPopularRecipe } from "@/lib/api/recipes";

const FeaturedPage = async () => {
  const recipes = await getFeatureAndPopularRecipe();
  const popularRecipes = recipes?.featuredRecipes;

  return <FeaturedRecipes recipes={popularRecipes} />;
};

export default FeaturedPage;
