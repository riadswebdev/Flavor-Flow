"use server";

import { apiClient } from "../server";

export const toggleUserBlockStatus = async (userId) =>
  apiClient(`/api/users/${userId}/toggle-block`, "PATCH");
