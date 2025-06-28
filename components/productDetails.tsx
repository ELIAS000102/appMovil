import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import CartModal from "../components/CartModal";
import ProductCard from "./ProductCard/productCard";
import Cart, { useCartFunctions } from "../screens/Cart";
import { Product } from "@/database/products";
import themeManager from "@/Theme/ThemeManager";

type ProductDetailsProps = {
  visible: boolean;
  onClose: () => void;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  stock: number;
  categories: string[];
  allProducts: Product[];
};

export default function ProductDetails({
  visible,
  onClose,
  name,
  price,
  imageUrl,
  description,
  stock,
  categories,
  allProducts,
}: ProductDetailsProps) {
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState<"light" | "dark">(themeManager.getMode());
  const { addItem } = useCartFunctions();

  useEffect(() => {
    const loadTheme = async () => {
      await themeManager.init();
      setMode(themeManager.getMode());
      themeManager.subscribe(setMode);
    };
    loadTheme();
    return () => themeManager.unsubscribe(setMode);
  }, []);

  const theme = themeManager.getTheme();

  useEffect(() => {
    if (!visible) setQuantity(1);
  }, [visible]);

  const handleAddToCart = () => {
    addItem({
      name,
      price,
      imageUrl,
      description,
      stock,
      categories,
      quantity,
    });
    setShowAddToCart(true);
  };

  const handleIncrease = () => {
    if (quantity < stock) setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const relatedProducts = useMemo(() => {
    return allProducts.filter(
      (product) =>
        product.name !== name &&
        product.categories.some((cat) => categories.includes(cat))
    );
  }, [allProducts, name, categories]);

  return (
    <>
      <Modal
        isVisible={visible}
        onBackdropPress={onClose}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modalProductDetails}
      >
        <View style={[styles.containerProductDetails, { backgroundColor: theme.background }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButtonProductDetails}>
              <Ionicons name="close" size={24} color={theme.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Image source={{ uri: imageUrl }} style={styles.imageProductDetails} />
            <View style={styles.infoContainerProductDetails}>
              <Text style={[styles.name, { color: theme.primary }]}>{name}</Text>
              <View style={styles.priceStockContainer}>
                <Text style={[styles.priceProductDetails, { color: theme.primary }]}>
                  S/. {price.toFixed(2)}
                </Text>
                <Text
                  style={[
                    { color: theme.primary },
                    stock <= 0 && styles.outOfStock,
                  ]}
                >
                  {stock > 0 ? `Disponible: ${stock} unidades` : "Agotado"}
                </Text>
              </View>

              <View style={styles.descriptionContainer}>
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Descripción</Text>
                <Text style={[styles.description, { color: theme.secondary }]}>{description}</Text>
              </View>

              <View style={styles.quantityContainer}>
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Cantidad</Text>
                <View style={[styles.quantitySelector, { borderColor: theme.primary }]}>
                  <TouchableOpacity onPress={handleDecrease}>
                    <Ionicons name="remove" size={20} color={theme.primary} />
                  </TouchableOpacity>
                  <Text style={[styles.quantityText, { color: theme.primary }]}>{quantity}</Text>
                  <TouchableOpacity onPress={handleIncrease}>
                    <Ionicons name="add" size={20} color={theme.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {relatedProducts.length > 0 && (
              <View style={styles.relatedContainer}>
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Productos relacionados</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {relatedProducts.map((product) => (
                    <View key={product.name} style={{ marginRight: 10 }}>
                      <ProductCard {...product} />
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.addToCartButton,
              { backgroundColor: theme.primary },
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

      <CartModal
        visible={showAddToCart}
        onClose={() => {
          setShowAddToCart(false);
          onClose();
        }}
        onViewCart={() => {
          setShowAddToCart(false);
          setShowCartModal(true);
        }}
      />

      <Cart visible={showCartModal} onClose={() => setShowCartModal(false)} />
    </>
  );
}

const { width } = Dimensions.get("window");
const imageSize = width * 0.8;

const styles = StyleSheet.create({
  modalProductDetails: { margin: 0, justifyContent: "flex-end" },
  containerProductDetails: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  header: { flexDirection: "row", justifyContent: "flex-end", padding: 16 },
  closeButtonProductDetails: { padding: 4 },
  scrollContent: { paddingBottom: 20 },
  imageProductDetails: {
    width: imageSize,
    height: imageSize,
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  infoContainerProductDetails: { paddingHorizontal: 24 },
  name: { fontSize: 24, fontWeight: "600", marginBottom: 8 },
  priceStockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  priceProductDetails: { fontSize: 22, fontWeight: "700" },
  outOfStock: { color: "#e76f51" },
  descriptionContainer: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  description: { fontSize: 15, lineHeight: 22 },
  quantityContainer: { marginBottom: 24 },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  quantityText: { fontSize: 18, fontWeight: "500", marginHorizontal: 16 },
  addToCartButton: {
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  disabledAddToCart: { backgroundColor: "#ccc" },
  addToCartText: { color: "white", fontSize: 16, fontWeight: "600" },
  relatedContainer: { marginTop: 20, paddingHorizontal: 10 },
});
