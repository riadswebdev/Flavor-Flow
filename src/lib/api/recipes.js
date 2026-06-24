"use server";

const baseUrl =
  process.env.NEXT_PUBLIC_RECIPES_API_URL || "http://localhost:8000";

export const getRecipes = async (params) => {
  const res = await fetch(`${baseUrl}/api/recipes?${params}`);
  const data = await res.json();

  return data;
};

export const getRecipesByUserId = async (userId) => {
  const res = await fetch(`${baseUrl}/api/user/${userId}/recipes`);
  const data = await res.json();
  return data;
};

export const getSingleRecipe = async (id) => {
  const res = await fetch(`${baseUrl}/api/recipes/${id}`);
  const data = await res.json();
  return data.data;
};

export const getLikeStatus = async (recipeId, userId) => {
  const res = await fetch(
    `${baseUrl}/api/recipes/${recipeId}/like-status?userId=${userId}`,
  );
  const data = await res.json();
  return data;
};

export const getFavoriteRecipesStatus = async (recipeId, userId) => {
  const res = await fetch(
    `${baseUrl}/api/user/recipes/${recipeId}/favorite-status?userId=${userId}`,
  );
  const data = await res.json();
  return data;
};

export const getFavoriteRecipes = async (userId) => {
  const res = await fetch(`${baseUrl}/api/user/${userId}/favorite-recipes`);
  const data = await res.json();
  return data.favoriteRecipes;
};

export const getFeatureAndPopularRecipe = async () => {
  const res = await fetch(`${baseUrl}/api/feature&popularRecipe`);
  return await res.json();
};

export const getSubscriptionsPlans = async () => {
  const res = await fetch(`${baseUrl}/api/subscription-plans`);
  console.log("res", res);
  const data = await res.json();
  console.log("data", data);
  return data;
}