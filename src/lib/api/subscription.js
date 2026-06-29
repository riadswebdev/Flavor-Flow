'use server';

import { apiClient } from "../server";

export const getSubscriptionsPlans = async () =>
  apiClient("/api/subscription-plans");
