"use server";

const baseUrl =
  process.env.NEXT_PUBLIC_RECIPES_API_URL ||
  "https://flavor-flow-server.onrender.com";

export const apiClient = async (
  path,
  method = "GET",
  data = null,
  token = null,
) => {
  const options = {
    method,
    headers: {},
    cache: "no-store",
  };
  if (data && method !== "GET") {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${path}`, options);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    throw new Error(
      errorData?.message ||
        `API Error: ${res?.status} ${res?.statusText} ${res?.message || ""}`,
    );
  }

  return res.json();
};
