'use server';

import { apiClient } from "../server";


export const deleteReport = async (reportId) =>
  apiClient(`/api/reports/${reportId}`, "DELETE");