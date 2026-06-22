"use server";
const baseUrl = process.env.NEXT_PUBLIC_RECIPES_API_URL;
export const publishRecipe = async (recipeData) => {
    console.log("Publishing recipe with data:", recipeData);
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
    console.log("Recipe published successfully:", data);
    return data;
  } catch (error) {
    console.error("Error publishing recipe:", error);
    throw error;
  }
};
