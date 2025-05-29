import { Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import ProductDetails from "./productDetails";
import { StyleSheet } from "react-native";

type ProductCardProps = {
  name: string;
  price: number;
  imageUrl: string;
  onPress?: () => void;
};

export default function ProductCard({
  name,
  price,
  imageUrl,
}: ProductCardProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
        style={style.productCard}
      >
        <Image source={{ uri: imageUrl }} style={style.productImage} />
        <Text style={{ fontSize: 16, fontWeight: "600" }} numberOfLines={1}>
          {name}
        </Text>
        <Text style={{ fontSize: 14, color: "#4caf50", marginTop: 4 }}>
          S/.{price.toFixed(2)}
        </Text>
      </TouchableOpacity>

      {/* Modal con la información del producto */}
      <ProductDetails
        visible={visible}
        onClose={() => setVisible(false)}
        name={name}
        price={price}
        imageUrl={imageUrl}
      />
    </>
  );
}

const style = StyleSheet.create({
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 8,
  },

  productCard: {
    borderRadius: 16,
    backgroundColor: "#ffffff", // fondo limpio
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    margin: 8,
    width: 160,
  },

});