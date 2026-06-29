'use server';

import { apiClient } from "../server";

export const getTotalTransactions = async () =>
  apiClient("/api/transactions/total-transactions");