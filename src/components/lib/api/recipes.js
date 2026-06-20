"use server";

const baseUrl =
  process.env.NEXT_PUBLIC_RECIPES_API_URL || "http://localhost:8000";

export const getRecipes = async (params) => {
  const res = await fetch(`${baseUrl}/api/recipes?${params}`);
  const data = await res.json();

  return data;
};

export const getSingleRecipe = async (id) => {
  const res = await fetch(`${baseUrl}/api/recipes/${id}`);
  const data = await res.json();
  return data.data;
};

export const getLikeStatus = async (recipeId,userId) => {
  const res = await fetch(
    `${baseUrl}/api/recipes/${recipeId}/like-status?userId=${userId}`,
  );
  const data = await res.json()
  return data;
};
