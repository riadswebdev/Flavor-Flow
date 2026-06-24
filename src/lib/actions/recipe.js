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

export const deleteFavRecipe = async (recipeId, userId) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/user/${userId}/favorite-recipes/${recipeId}`,
      {
        method: "DELETE",
      },
    );
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

export const likeToggle = async (recipeId, userId, action) => {
  const res = await fetch(`${baseUrl}/api/recipes/${recipeId}/like`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action,
      userId: userId,
    }),
  });

  return await res.json();
};

export const toggleFavoriteRecipe = async (recipeId, favRecipe, action) => {
  const res = await fetch(`${baseUrl}/api/recipes/${recipeId}/favorite`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action,
      favRecipe,
    }),
  });

  return await res.json();
};

export const reportRecipe = async (recipeReportData) => {
  try {
    const res = await fetch(`${baseUrl}/api/recipes/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeReportData),
    });

    if (!res.ok) {
      throw new Error("Failed to report recipe");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error reporting recipe:", error);
    throw error;
  }
};
