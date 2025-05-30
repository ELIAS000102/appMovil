import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../Styles/globalStyles"; // Asegúrate de que la ruta sea correcta

type Props = {
  visible: boolean;
};

export default function AddToCartModal({ visible }: Props) {
  return (
    <Modal
      isVisible={visible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.modalContentCart}>
        <Ionicons name="cart" size={48} color="#4caf50" />
        <Text style={styles.message}>¡Producto agregado al carrito!</Text>
      </View>
    </Modal>
  );
}


