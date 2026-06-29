"use server";

import { apiClient } from "../server";

export const updateSubscriptionStatusAndSaveTransaction = async (
  transactionData,
) => {
  console.log(transactionData);
  return apiClient(`/api/users/subscription/update`, "POST", transactionData);
};
