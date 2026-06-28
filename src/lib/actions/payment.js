"use server";

import { apiClient } from "../server";

export const submitSubscription = async (data) =>
  apiClient(`/api/subscriptions`, "POST", data);

export const updateSubscriptionStatusAndSaveTransaction = async (
  transactionData,
) => apiClient(`/api/users/subscription/update`, "POST", transactionData);
