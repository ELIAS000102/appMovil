import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type CartItem = {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
  categories: string[];
  quantity: number;
};

let cartItems: CartItem[] = [];

export const useCartFunctions = () => {
  return {
    getCart: () => cartItems,
    addItem: (item: CartItem) => {
      const index = cartItems.findIndex((p) => p.name === item.name);
      if (index !== -1) {
        cartItems[index].quantity += item.quantity;
      } else {
        cartItems.push(item);
      }
    },
    removeItem: (name: string) => {
      cartItems = cartItems.filter((item) => item.name !== name);
    },
    updateQuantity: (name: string, quantity: number) => {
      const index = cartItems.findIndex((p) => p.name === name);
      if (index !== -1) {
        cartItems[index].quantity = quantity;
      }
    },
  };
};

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function Cart({ visible, onClose }: Props) {
  const [refresh, setRefresh] = useState(false);
  const { getCart, removeItem, updateQuantity } = useCartFunctions();
  const items = getCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const increase = (name: string) => {
    const item = items.find((i) => i.name === name);
    if (item && item.quantity < item.stock) {
      updateQuantity(name, item.quantity + 1);
      setRefresh(!refresh);
    }
  };

  const decrease = (name: string) => {
    const item = items.find((i) => i.name === name);
    if (item && item.quantity > 1) {
      updateQuantity(name, item.quantity - 1);
      setRefresh(!refresh);
    }
  };

  const remove = (name: string) => {
    removeItem(name);
    setRefresh(!refresh);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Carrito</Text>
        <FlatList
          data={items}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>S/. {item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.quantity}>
                <TouchableOpacity onPress={() => decrease(item.name)}>
                  <Ionicons name="remove-circle" size={24} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increase(item.name)}>
                  <Ionicons name="add-circle" size={24} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => remove(item.name)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
        <Text style={styles.total}>Total: S/. {total.toFixed(2)}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 8,
  },
  name: { fontSize: 16, fontWeight: "500" },
  price: { fontSize: 14, color: "#666" },
  quantity: { flexDirection: "row", alignItems: "center", marginHorizontal: 10 },
  quantityText: { marginHorizontal: 8, fontSize: 16 },
  total: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  closeBtn: {
    marginTop: 20,
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: { color: "#fff", fontWeight: "bold" },
});
