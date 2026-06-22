"use server";
const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

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
      return;
    }
    const data = await res.json();
    console.log("User additional field updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating user additional field:", error);
    throw error;
  }
};
