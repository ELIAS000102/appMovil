// components/ProductCard.tsx
import React from "react";
import ProductCardBase from "./productCardBase";
import ProductDetails from "../productDetails";
import { Product } from "@/database/products";

type ProductCardProps = {
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  stock?: number;
  categoriePrimary: string;
  categorieSecondary: string;
  allProducts?: Product[]; // permite pasar productos desde props o usar fallback
};

export default function ProductCard({
  name,
  price,
  imageUrl,
  description = "No description available",
  stock = 0,
  categoriePrimary,
  categorieSecondary,
  allProducts = [], // por defecto, vacío si no se pasa nada
}: ProductCardProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <ProductCardBase
        name={name}
        price={price}
        imageUrl={imageUrl}
        stock={stock}
        onPress={() => setVisible(true)}
      />
      <ProductDetails
        visible={visible}
        onClose={() => setVisible(false)}
        name={name}
        price={price}
        imageUrl={imageUrl}
        description={description}
        stock={stock}
        categoriePrimary={categoriePrimary}
        categorieSecondary={categorieSecondary}
        allProducts={allProducts}
      />
    </>
  );
}
