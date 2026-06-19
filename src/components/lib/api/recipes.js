"use server";

const baseUrl = process.env.NEXT_PUBLIC_RECIPES_API_URL || "http://localhost:8000";

export const getRecipes = async (params) => {
    const res = await fetch(
      `${baseUrl}/api/recipes?${params}`,
    );
    const data = await res.json();

    return data;
}