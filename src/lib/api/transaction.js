'use server';

import { apiClient } from "../server";

export const getTotalTransactions = async () =>
  apiClient("/api/transactions/total-transactions");


export const getTransactionsByUserId = async (userId) =>
  apiClient(`/api/users/${userId}/recipe-purchase`);