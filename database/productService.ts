// database/productService.ts

import { Product } from "./products";

const BASE_URL =
  "https://servidorshopapp-hmeuhvejdudchfc3.canadaeast-01.azurewebsites.net/productos";

// Obtener todos los productos
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    const mappedProducts: Product[] = data.map((item: any) => ({
      id: item.Id, // Asegúrate de que el backend devuelva el campo id
      name: item.Name,
      price: item.Price,
      imageUrl: item.ImageUrl,
      description: item.Description,
      stock: item.Stock,
      categoriePrimary: item.CategoriePrimary,
      categorieSecondary: item.CategorieSecondary,
    }));

    return mappedProducts;
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return [];
  }
}

// Crear un nuevo producto
export async function createProduct(product: Product): Promise<boolean> {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    return response.ok;
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    return false;
  }
}

// Actualizar producto existente
export async function updateProduct(id: number, product: Product): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    return response.ok;
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    return false;
  }
}

// Eliminar producto por ID
export async function deleteProduct(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    return response.ok;
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    return false;
  }
}
