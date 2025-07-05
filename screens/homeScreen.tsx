// screens/Galeria.tsx
import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ButtonLogin from "@/components/buttonLogin";
import UserLogin from "@/components/loginContainer/perfilUser";
import { useAuth } from "../authentication/useAuth";
import ProductCard from "../components/ProductCard/productCard";
import SearchBar from "../components/productSearch";
import { fetchProducts } from "../database/productService";
import { Product } from "../database/products";

import themeManager from "@/Theme/ThemeManager";
import CategoryFilterModal from "../components/CategoryFilterModal";
import PriceFilterModal from "../components/PriceFilterModal";
import Cart from "../screens/Cart";

export default function Galeria() {
  const [mode, setMode] = useState<"light" | "dark">(themeManager.getMode());
  const [products, setProducts] = useState<Product[]>([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { user } = useAuth();
  const theme = themeManager.getTheme();

  useEffect(() => {
    themeManager.subscribe(setMode);
    return () => {
      themeManager.unsubscribe(setMode);
    };
  }, []);

  useEffect(() => {
    fetchProducts().then((data) => {
      const validProducts = data.filter((p) => p && p.name);
      setProducts(validProducts);
    });
  }, []);

  const normalizeText = (text?: string) =>
    (text ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  const allMainCategories = Array.from(
    new Set(products.map((p) => p.categoriePrimary))
  );

  const subCategories = selectedMainCategory
    ? Array.from(
        new Set(
          products
            .filter((p) => p.categoriePrimary === selectedMainCategory)
            .map((p) => p.categorieSecondary)
        )
      )
    : [];

  const filteredProducts = products
    .filter((product) =>
      normalizeText(product.name).includes(normalizeText(searchTerm))
    )
    .filter((product) => {
      if (selectedMainCategory && product.categoriePrimary !== selectedMainCategory)
        return false;
      if (selectedSubCategory && product.categorieSecondary !== selectedSubCategory)
        return false;
      const price = product.price;
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && price < min) return false;
      if (!isNaN(max) && price > max) return false;
      return true;
    });

  return (
    <SafeAreaView style={[styles.safeAreaGalery, { backgroundColor: theme.background }]}>
      <View style={[styles.containerGalery, { backgroundColor: theme.background }]}>
        <View style={styles.headerGalery}>
          <View style={styles.leftContainerGalery}>
            <SearchBar onSearch={setSearchTerm} />
          </View>
          <View style={styles.rightContainerGalery}>
            {user ? (
              <UserLogin onViewCart={() => setShowCartModal(true)} />
            ) : (
              <ButtonLogin />
            )}
            <Cart visible={showCartModal} onClose={() => setShowCartModal(false)} />
          </View>
        </View>

        <View style={styles.filterButtonsContainerGalery}>
          <Pressable
            onPress={() => setMenuVisible(true)}
            style={[styles.filterButtonGalery, { backgroundColor: theme.primary }]}
          >
            <Text style={[styles.filterButtonTextGalery, { color: theme.textPrimary }]}>
              Categoría
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setPriceModalVisible(true)}
            style={[styles.filterButtonGalery, { backgroundColor: theme.primary }]}
          >
            <Text style={[styles.filterButtonTextGalery, { color: theme.textPrimary }]}>
              Precio
            </Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.productsContainerGalery}>
          {filteredProducts.length > 0 ? (
            <View style={styles.productsGridGalery}>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  description={product.description}
                  stock={product.stock}
                  categoriePrimary={product.categoriePrimary}
                  categorieSecondary={product.categorieSecondary}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyStateGalery}>
              <Text style={[styles.emptyTextGalery, { color: theme.textPrimary }]}>
                No se encontraron productos
              </Text>
              <Text style={[styles.emptySubtextGalery, { color: theme.textSecondary }]}>
                Intenta con otros términos de búsqueda o ajusta los filtros
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <CategoryFilterModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        allMainCategories={allMainCategories}
        selectedMainCategory={selectedMainCategory}
        setSelectedMainCategory={setSelectedMainCategory}
        selectedSubCategory={selectedSubCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        subCategories={subCategories}
      />

      <PriceFilterModal
        visible={priceModalVisible}
        onClose={() => setPriceModalVisible(false)}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaGalery: { flex: 1 },
  containerGalery: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerGalery: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  leftContainerGalery: { flex: 1 },
  rightContainerGalery: { justifyContent: "flex-end" },
  filterButtonsContainerGalery: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  filterButtonGalery: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  filterButtonTextGalery: { fontSize: 14 },
  productsContainerGalery: { paddingBottom: 180 },
  productsGridGalery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  emptyStateGalery: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyTextGalery: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtextGalery: {
    fontSize: 14,
    textAlign: "center",
  },
});
