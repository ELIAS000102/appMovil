import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme, darkTheme } from "../Theme/colors";

type Props = {
  visible: boolean;
  onClose: () => void;
  onViewCart: () => void; // ✅ nueva prop
};

export default function CartModal({ visible, onClose, onViewCart }: Props) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? darkTheme : lightTheme;
  const styles = useMemo(() => getStyles(theme), [theme]);

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
      style={styles.modalCardModal}
      onBackdropPress={onClose}
    >
      <View style={[styles.containerCardModal, { backgroundColor: theme.surface }]}>
        <TouchableOpacity style={styles.closeButtonCardModal} onPress={onClose}>
          <Ionicons name="close" size={24} color={theme.primary} />
        </TouchableOpacity>

        <View style={[styles.iconContainerCardModal, { backgroundColor: theme.surface }]}>
          <Ionicons
            name="checkmark-circle"
            size={60}
            color={theme.primary}
            style={[styles.iconShadowCardModal, { shadowColor: theme.primary }]}
          />
        </View>

        <Text style={[styles.titleCardModal, { color: theme.primary }]}>¡Agregado al carrito!</Text>
        <Text style={[styles.subtitleCardModal, { color: theme.textSecondary }]}>
          El producto se ha añadido correctamente
        </Text>

        <TouchableOpacity
          style={[styles.footerCardModal, { borderTopColor: theme.primary }]}
          onPress={() => {
            onClose();
            onViewCart();
          }}
        >
          <Ionicons name="cart" size={24} color={theme.primary} />
          <Text style={[styles.footerTextCardModal, { color: theme.primary }]}>Ver carrito</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const { width } = Dimensions.get("window");
const modalWidth = width * 0.85;

const getStyles = (theme: typeof lightTheme) =>
  StyleSheet.create({
    modalCardModal: {
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
    },
    containerCardModal: {
      borderRadius: 16,
      width: modalWidth,
      padding: 24,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 10,
      position: "relative",
    },
    closeButtonCardModal: {
      position: "absolute",
      top: 12,
      right: 12,
      zIndex: 10,
      padding: 4,
    },
    iconContainerCardModal: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    iconShadowCardModal: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    titleCardModal: {
      fontSize: 22,
      fontWeight: "600",
      marginBottom: 8,
      textAlign: "center",
    },
    subtitleCardModal: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 24,
      lineHeight: 22,
    },
    footerCardModal: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 16,
      borderTopWidth: 1,
      width: "100%",
      justifyContent: "center",
    },
    footerTextCardModal: {
      fontSize: 16,
      fontWeight: "500",
      marginLeft: 8,
    },
  });
