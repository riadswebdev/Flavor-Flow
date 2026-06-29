"use server";

import { apiClient } from "../server";

export const getAdminDashboardOverviewDataByAdminId = async (adminId) =>
  apiClient(`/api/admin/${adminId}/dashboard-overview`);