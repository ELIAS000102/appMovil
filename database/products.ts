// database/products.ts

export interface Product {
  id?: number;
  name: string;
  price: number;
  imageUrl: string;
  categoriePrimary: string;
  categorieSecondary: string;
  description: string;
  stock: number;
}
