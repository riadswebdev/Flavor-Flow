"use server";

import { apiClient } from "../server";

export const publishRecipe = async (recipeData) =>
  apiClient(`/api/recipes/publish`, "POST", recipeData);

export const updateRecipe = async (recipeId, updatedData) =>
  apiClient(`/api/recipes/${recipeId}`, "PATCH", updatedData);

export const deleteRecipe = async (recipeId) =>
  apiClient(`/api/recipes/${recipeId}`, "DELETE");

export const deleteFavRecipe = async (recipeId, userId) =>
  apiClient(`/api/user/${userId}/favorite-recipes/${recipeId}`, "DELETE");

export const likeToggle = async (recipeId, userId, action) =>
  apiClient(`/api/recipes/${recipeId}/like`, "PATCH", { action, userId });

export const toggleFavoriteRecipe = async (recipeId, favRecipe, action) =>
  apiClient(`/api/recipes/${recipeId}/favorite`, "PATCH", {
    action,
    favRecipe,
  });
export const reportRecipe = async (recipeReportData) =>
  apiClient(`/api/recipes/report`, "POST", recipeReportData);


