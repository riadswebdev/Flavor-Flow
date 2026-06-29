"use server";

import { apiClient } from "../server";


export const getAllReports = async ()=> apiClient("/api/reports/total-reports")