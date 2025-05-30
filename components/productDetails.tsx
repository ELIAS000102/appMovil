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
import { styles } from "../Styles/globalStyles"; // Asegúrate de que la ruta sea correcta

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
        style={{ flex: 1, margin: 0 }} // Asegúrate de que el modal ocupe toda la pantalla
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


