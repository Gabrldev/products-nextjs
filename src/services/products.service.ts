import { API_URL } from "@/config/index";
import { Product } from "@/types/products";
import { Response } from "@/types/response";
import { queryOptions } from "@tanstack/react-query";

export const getProducts = queryOptions({
  queryKey: ["products"],
  queryFn: async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as Response<Product[]>;
    } catch (error) {
      console.error("Error fetching products:", error);
      return {
        success: true,
        data: [],
        message: "Error loading products",
      } as Response<Product[]>;
    }
  },
  staleTime: 1000 * 60 * 5, 
  refetchOnMount: true,
  refetchOnWindowFocus: true,
});

export async function addProduct(product: {
  nombre: string;
  precio: number;
}): Promise<Response<Product>> {
  const response = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al agregar producto");
  }

  return response.json();
}
