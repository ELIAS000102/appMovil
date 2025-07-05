// components/ProductCardWithModal.tsx
import React from "react";
import ProductCardBase from "./productCardBase";
import ProductDetails from "../productDetails";
import { products } from "@/database/products";
import { Dimensions, StyleSheet } from "react-native";

type ProductCardProps = {
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  stock?: number;
  categories?: string[];
};

export default function ProductCard({
  name,
  price,
  imageUrl,
  description = "No description available",
  stock = 0,
  categories = [],
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
        categories={categories}
        allProducts={products}
      />
    </>
  );
}

