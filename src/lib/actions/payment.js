"use server";

import { apiClient } from "../server";

export const updateSubscriptionStatusAndSaveTransaction = async (
  transactionData,
) => apiClient(`/api/users/subscription/update`, "POST", transactionData);

export const saveRecipePurchaseTransaction = async (transactionData) => {
  return apiClient(`/api/users/recipe-purchase/save`, "POST", transactionData);
};
