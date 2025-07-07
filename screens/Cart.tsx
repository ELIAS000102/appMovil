import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import themeManager from "@/Theme/ThemeManager";

export type CartItem = {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
  quantity: number;
  categoriePrimary: string;
  categorieSecondary: string;
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
  const [mode, setMode] = useState(themeManager.getMode());
  const theme = themeManager.getTheme();

  useEffect(() => {
    themeManager.subscribe(setMode);
    return () => {
      themeManager.unsubscribe(setMode);
    };
  }, []);

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
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.primary }]}>Mi carrito</Text>

        <FlatList
          data={items}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: theme.primary }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.name, { color: theme.textPrimary }]}>
                  {item.name}
                </Text>
                <Text style={[styles.category, { color: theme.textSecondary }]}>
                  {item.categoriePrimary} / {item.categorieSecondary}
                </Text>
                <Text style={[styles.price, { color: theme.primary }]}>
                  S/. {item.price.toFixed(2)}
                </Text>
              </View>

              <View style={styles.controls}>
                <TouchableOpacity onPress={() => decrease(item.name)}>
                  <Ionicons name="remove-circle" size={26} color={theme.primary} />
                </TouchableOpacity>
                <Text style={[styles.quantity, { color: theme.textPrimary }]}>
                  {item.quantity}
                </Text>
                <TouchableOpacity onPress={() => increase(item.name)}>
                  <Ionicons name="add-circle" size={26} color={theme.primary} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => remove(item.name)}>
                <Ionicons name="trash" size={24} color="#ff4d4d" />
              </TouchableOpacity>
            </View>
          )}
        />

        <View style={styles.footer}>
          <Text style={[styles.total, { color: theme.primary }]}>
            Total: <Text style={{ color: theme.secondary }}>S/. {total.toFixed(2)}</Text>
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={[styles.closeBtn, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    gap: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  category: {
    fontSize: 13,
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "transparent",
  },
  closeBtn: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
