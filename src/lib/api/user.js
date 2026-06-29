"use server";

import { apiClient } from "../server";

export const getTotalUsers = async () => apiClient("/api/users/total-users");