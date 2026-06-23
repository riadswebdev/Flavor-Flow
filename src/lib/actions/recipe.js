"use server";
const baseUrl = process.env.NEXT_PUBLIC_RECIPES_API_URL;
export const publishRecipe = async (recipeData) => {
  try {
    const res = await fetch(`${baseUrl}/api/recipes/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });
    if (!res.ok) {
      throw new Error("Failed to publish recipe");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error publishing recipe:", error);
    throw error;
  }
};

export const updateRecipe = async (recipeId, updatedData) => {
  try {
    const res = await fetch(`${baseUrl}/api/recipes/${recipeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error("Failed to update recipe");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

export const deleteRecipe = async (recipeId) => {
  try {
    const res = await fetch(`${baseUrl}/api/recipes/${recipeId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete recipe");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};
