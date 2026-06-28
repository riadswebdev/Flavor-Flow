"use server";

import { apiClient } from "../server";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// export const updateUserAdditionalField = async (additionalField, userID) => {
//   try {
//     const res = await fetch(`${baseUrl}/update/${userID}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(additionalField),
//     });
//     if (!res.ok) {
//       throw new Error("Failed to update user additional field");
//       return;
//     }
//     const data = await res.json();
//     console.log("User additional field updated successfully:", data);
//     return data;
//   } catch (error) {
//     console.error("Error updating user additional field:", error);
//     throw error;
//   }
// };

export const toggleUserBlockStatus = async (userId) =>
  apiClient(`/api/users/${userId}/toggle-block`, "PATCH");
// export const toggleUserBlockStatus = async (userId) => {
//   console.log("Initiating server-side block toggle for user:", userId);

//   try {

//     const response = await fetch(
//       `${baseUrl}/api/users/${userId}/toggle-block`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         cache: "no-store",
//       },
//     );

//     if (!response.ok) {
//       const errData = await response.json().catch(() => ({}));
//       throw new Error(errData.message || "Failed to toggle block status");
//     }

//     const data = await response.json();
//     return data; // returns { success: true, isBlocked: boolean }
//   } catch (error) {
//     console.error("Error inside toggleUserBlockStatus action:", error);
//     throw error;
//   }
// };
