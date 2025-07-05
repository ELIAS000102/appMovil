// database/productService.ts
import { Product } from "./products";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://shopapp-backend-aeh8gsbegxdva5bc.brazilsouth-01.azurewebsites.net/productos");
    const data = await response.json();

    // Mapea las claves del backend al formato esperado
    const mappedProducts: Product[] = data.map((item: any) => ({
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
    console.error("Error al obtener productos:", error);
    return [];
  }
}
