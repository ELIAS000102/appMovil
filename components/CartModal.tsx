import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void; // ✅ Nueva prop
};

export default function AddToCartModal({ visible, onClose }: Props) {
  return (
    <Modal
      isVisible={visible}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationInTiming={400}
      animationOutTiming={400}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={0}
      backdropOpacity={0.4}
      style={styles.modal}
      onBackdropPress={onClose} // ✅ Permitir cerrar al tocar el fondo
    >
      <View style={styles.container}>
        {/* Botón para cerrar manualmente */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <Ionicons
            name="checkmark-circle"
            size={60}
            color="#4CAF50"
            style={styles.iconShadow}
          />
        </View>

        <Text style={styles.title}>¡Agregado al carrito!</Text>
        <Text style={styles.subtitle}>
          El producto se ha añadido correctamente
        </Text>

        <View style={styles.footer}>
          <Ionicons name="cart" size={24} color="#4CAF50" />
          <Text style={styles.footerText}>Ver carrito</Text>
        </View>
      </View>
    </Modal>
  );
}

const { width } = Dimensions.get("window");
const modalWidth = width * 0.85;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    width: modalWidth,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 4,
  },
  iconContainer: {
    backgroundColor: "#E8F5E9",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  iconShadow: {
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2E7D32",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#616161",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    width: "100%",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "500",
    marginLeft: 8,
  },
});
