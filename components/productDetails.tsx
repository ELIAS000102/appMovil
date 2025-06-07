import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import CartModal from "../components/CartModal";

type ProductDetailsProps = {
  visible: boolean;
  onClose: () => void;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
};

export default function ProductDetails({
  visible,
  onClose,
  name,
  price,
  imageUrl,
  description,
  stock,
}: ProductDetailsProps) {
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!visible) {
      setQuantity(1);
    }
  }, [visible]);

  const handleAddToCart = () => {
    setShowAddToCart(true);
    setTimeout(() => {
      setShowAddToCart(false);
      onClose();
    }, 20000);
  };

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <>
      <Modal
        isVisible={visible}
        onBackdropPress={onClose}
        animationIn="slideInUp" // Entrada: de abajo hacia arriba
        animationOut="slideOutDown" // Salida: de arriba hacia abajo
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Product Image */}
            <Image source={{ uri: imageUrl }} style={styles.image} />

            {/* Product Info */}
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{name}</Text>

              <View style={styles.priceStockContainer}>
                <Text style={styles.price}>S/. {price.toFixed(2)}</Text>
                <Text
                  style={[
                    styles.stock,
                    stock > 0 ? styles.inStock : styles.outOfStock,
                  ]}
                >
                  {stock > 0 ? `Disponible: ${stock} unidades` : "Agotado"}
                </Text>
              </View>

              {/* Description */}
              <View style={styles.descriptionContainer}>
                <Text style={styles.sectionTitle}>Descripción</Text>
                <Text style={styles.description}>{description}</Text>
              </View>

              {/* Quantity Selector */}
              <View style={styles.quantityContainer}>
                <Text style={styles.sectionTitle}>Cantidad</Text>
                <View style={styles.quantitySelector}>
                  <TouchableOpacity
                    onPress={handleDecrease}
                    style={[
                      styles.quantityButton,
                      quantity === 1 && styles.disabledButton,
                    ]}
                    disabled={quantity === 1}
                  >
                    <Ionicons
                      name="remove"
                      size={20}
                      color={quantity === 1 ? "#ccc" : "#333"}
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity
                    onPress={handleIncrease}
                    style={[
                      styles.quantityButton,
                      quantity === stock && styles.disabledButton,
                    ]}
                    disabled={quantity === stock}
                  >
                    <Ionicons
                      name="add"
                      size={20}
                      color={quantity === stock ? "#ccc" : "#333"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={[
              styles.addToCartButton,
              stock === 0 && styles.disabledAddToCart,
            ]}
            onPress={handleAddToCart}
            disabled={stock === 0}
          >
            <Text style={styles.addToCartText}>
              {stock > 0 ? "Agregar al carrito" : "Producto agotado"}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Confirmation Modal */}
      <CartModal
        visible={showAddToCart}
        onClose={() => setShowAddToCart(false)}
      />
    </>
  );
}

const { width } = Dimensions.get("window");
const imageSize = width * 0.8;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  closeButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  image: {
    width: imageSize,
    height: imageSize,
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  infoContainer: {
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  priceStockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2a9d8f",
  },
  stock: {
    fontSize: 14,
    fontWeight: "500",
  },
  inStock: {
    color: "#2a9d8f",
  },
  outOfStock: {
    color: "#e76f51",
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#000000FF",
    lineHeight: 22,
  },
  quantityContainer: {
    marginBottom: 24,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  quantityButton: {
    padding: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "500",
    marginHorizontal: 16,
    minWidth: 30,
    textAlign: "center",
  },
  addToCartButton: {
    backgroundColor: "#2a9d8f",
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledAddToCart: {
    backgroundColor: "#ccc",
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
