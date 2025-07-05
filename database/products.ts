// database/products.ts

export interface Product {
  name: string;
  price: number;
  imageUrl: string;
  categoriePrimary: string;
  categorieSecondary: string;
  description: string;
  stock: number;
}
