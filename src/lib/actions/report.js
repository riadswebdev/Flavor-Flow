'use server';

import { apiClient } from "../server";


export const deleteReport = async (reportId) => {
  console.log("deleteReport called with reportId:", reportId);
  return apiClient(`/api/reports/${reportId}`, "DELETE");
}