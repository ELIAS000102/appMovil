import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

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
      <View style={styles.modalContent}>
        <Ionicons name="cart" size={48} color="#4caf50" />
        <Text style={styles.message}>¡Producto agregado al carrito!</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
    marginTop: 10,
  },
});
