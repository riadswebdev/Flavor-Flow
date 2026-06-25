"use server";

import { apiClient } from "../server";

export const getRecipes = async (params) => apiClient(`/api/recipes?${params}`);

export const getRecipesByUserId = async (userId) =>
  apiClient(`/api/user/${userId}/recipes`);

export const getSingleRecipe = async (id) => apiClient(`/api/recipes/${id}`);

export const getLikeStatus = async (recipeId, userId) =>
  apiClient(`/api/recipes/${recipeId}/like-status?userId=${userId}`);

export const getFavoriteRecipesStatus = async (recipeId, userId) =>
  apiClient(`/api/user/recipes/${recipeId}/favorite-status?userId=${userId}`);

export const getFavoriteRecipes = async (userId) =>
  apiClient(`/api/user/${userId}/favorite-recipes`);

export const getFeatureAndPopularRecipe = async () =>
  apiClient(`/api/feature&popularRecipe`);

export const getSubscriptionsPlans = async () =>
  apiClient("/api/subscription-plans");
