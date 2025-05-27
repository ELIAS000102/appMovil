import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
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
};

export default function ProductDetails({
  visible,
  onClose,
  name,
  price,
  imageUrl,
}: ProductDetailsProps) {
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // 🟢 Cada vez que se cierre el modal, reinicia la cantidad a 1
  useEffect(() => {
    if (!visible) {
      setQuantity(1);
    }
  }, [visible]);

  const handleAddToCart = () => {
    setShowAddToCart(true);
    console.log(`Producto agregado al carrito: ${name} x${quantity}`);

    // Después de 1.5 segundos, ocultamos el modal de confirmación
    setTimeout(() => {
      setShowAddToCart(false);
      onClose(); // También cierra el modal de detalles
    }, 1500);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
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
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.3}
        style={{ margin: 0 }}
      >
        <View style={styles.fullScreenModal}>
          {/* Botón de volver */}
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          {/* Contenido del modal */}
          <View style={styles.modalContent}>
            <Image source={{ uri: imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{name}</Text>
            <Text style={styles.productPrice}>S/.{price.toFixed(2)}</Text>

            {/* Selector de cantidad */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
                <Ionicons name="remove" size={20} color="black" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton}>
                <Ionicons name="add" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botón de agregar al carrito */}
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartText}>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal de confirmación */}
      <CartModal visible={showAddToCart} />
    </>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  fullScreenModal: {
    flex: 1,
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  modalContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  productImage: {
    width: "100%",
    height: height * 0.4,
    resizeMode: "cover",
    borderRadius: 10,
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 18,
    color: "#4caf50",
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 20,
  },
  addToCartButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 20,
  },
  addToCartText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
