"use server";
const baseUrl =
  process.env.NEXT_PUBLIC_RECIPES_API_URL || "http://localhost:8000";

export const updateUserAdditionalField = async (additionalField, userID) => {
  try {
    const res = await fetch(`${baseUrl}/update/${userID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(additionalField),
    });
    if (!res.ok) {
      throw new Error("Failed to update user additional field");
    }
  } catch (error) {
    console.error("Error updating user additional field:", error);
  }
};
