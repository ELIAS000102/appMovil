import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import ProductCard from "../components/productCard";
import { products } from "../database/products";
import SearchBar from "../components/productFilter";
import ButtonLogin from "@/components/buttonLogin";
import UserLogin from "@/components/loginContainer/perfilUser";
import { styles as globalStyles } from "../Styles/globalStyles";
import { useAuth } from "../authentication/useAuth";

export default function Galeria() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  const [menuVisible, setMenuVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const normalizeText = (text: string) =>
    text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  const allMainCategories = Array.from(
    new Set(products.map((p) => p.categories[0]))
  );

  const subCategories = selectedMainCategory
    ? Array.from(
        new Set(
          products
            .filter((p) => p.categories[0] === selectedMainCategory)
            .map((p) => p.categories[1])
        )
      )
    : [];

  const filteredProducts = products
    .filter((product) =>
      normalizeText(product.name).includes(normalizeText(searchTerm))
    )
    .filter((product) => {
      if (
        selectedMainCategory &&
        product.categories[0] !== selectedMainCategory
      )
        return false;
      if (selectedSubCategory && product.categories[1] !== selectedSubCategory)
        return false;
      const price = product.price;
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && price < min) return false;
      if (!isNaN(max) && price > max) return false;
      return true;
    });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.leftContainer}>
            <SearchBar onSearch={setSearchTerm} />
          </View>
          <View style={styles.rightContainer}>
            {user ? <UserLogin /> : <ButtonLogin />}
          </View>
        </View>

        <View style={styles.filterButtonsContainer}>
          <Pressable
            onPress={() => setMenuVisible(true)}
            style={styles.filterButton}
          >
            <Text style={styles.filterButtonText}>Categoría</Text>
          </Pressable>
          <Pressable
            onPress={() => setPriceModalVisible(true)}
            style={styles.filterButton}
          >
            <Text style={styles.filterButtonText}>Precio</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.productsContainer}
          showsVerticalScrollIndicator={true}
        >
          {filteredProducts.length > 0 ? (
            <View style={styles.productsGrid}>
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={`${product.name}-${index}`}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  description={product.description}
                  stock={product.stock}
                  onPress={() => console.log(`${product.name} seleccionado`)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No se encontraron productos</Text>
              <Text style={styles.emptySubtext}>
                Intenta con otros términos de búsqueda o ajusta los filtros
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Modal de Categorías */}
      <Modal visible={menuVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Pressable
                onPress={() => setMenuVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
            </View>
            <ScrollView>
              <View style={styles.modalContent}>
                <View style={styles.categoryColumn}>
                  <Text style={styles.columnTitle}>Categorías principales</Text>
                  {allMainCategories.map((main) => (
                    <Pressable
                      key={main}
                      onPress={() => {
                        setSelectedMainCategory(main);
                        setSelectedSubCategory(null);
                      }}
                      style={[
                        styles.categoryItem,
                        selectedMainCategory === main && styles.selectedItem,
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          selectedMainCategory === main && styles.selectedText,
                        ]}
                      >
                        {main}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <View style={styles.categoryColumn}>
                  <Text style={styles.columnTitle}>Subcategorías</Text>
                  {subCategories.length > 0 ? (
                    subCategories.map((sub) => (
                      <Pressable
                        key={sub}
                        onPress={() => {
                          setSelectedSubCategory(sub);
                          setMenuVisible(false);
                        }}
                        style={[
                          styles.categoryItem,
                          selectedSubCategory === sub && styles.selectedItem,
                        ]}
                      >
                        <Text
                          style={[
                            styles.categoryText,
                            selectedSubCategory === sub && styles.selectedText,
                          ]}
                        >
                          {sub}
                        </Text>
                      </Pressable>
                    ))
                  ) : (
                    <Text style={styles.noSubText}>
                      Selecciona una categoría principal
                    </Text>
                  )}
                </View>
              </View>
            </ScrollView>
            <Pressable
              onPress={() => {
                setSelectedMainCategory(null);
                setSelectedSubCategory(null);
                setMenuVisible(false);
              }}
            >
              <Text style={styles.clearFilters}>Limpiar filtros</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal de Precio */}
      <Modal visible={priceModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Pressable
                onPress={() => setPriceModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.priceFilterContent}>
              <Text style={styles.columnTitle}>Filtrar por precio</Text>

              <Text style={styles.priceLabel}>Precio mínimo:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Ej. 10"
                value={minPrice}
                onChangeText={setMinPrice}
              />

              <Text style={styles.priceLabel}>Precio máximo:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Ej. 100"
                value={maxPrice}
                onChangeText={setMaxPrice}
              />

              <Pressable
                onPress={() => setPriceModalVisible(false)}
                style={styles.applyButton}
              >
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setMinPrice("");
                  setMaxPrice("");
                  setPriceModalVisible(false);
                }}
              >
                <Text style={styles.clearFilters}>Limpiar filtros</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#ffffff",
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  leftContainer: { flex: 1 },
  rightContainer: { justifyContent: "flex-end" },
  filterButtonsContainer: { flexDirection: "row", gap: 12, marginBottom: 16 },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  filterButtonText: { fontSize: 14, color: "#333" },
  productsContainer: { paddingBottom: 180 },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: { fontSize: 14, color: "#666666", textAlign: "center" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  closeButton: { padding: 6 },
  closeButtonText: { fontSize: 20, color: "#444" },
  modalContent: { flexDirection: "row", gap: 12 },
  categoryColumn: { flex: 1 },
  columnTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: "#eee",
    marginBottom: 6,
  },
  selectedItem: { backgroundColor: "#cde" },
  categoryText: { fontSize: 14 },
  selectedText: { fontWeight: "bold" },
  noSubText: { fontStyle: "italic", color: "#666" },
  clearFilters: {
    marginTop: 16,
    textAlign: "center",
    color: "#007bff",
    fontWeight: "500",
  },
  priceFilterContent: { padding: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  priceLabel: { fontSize: 14, fontWeight: "500", marginBottom: 4 },
  applyButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  applyButtonText: { color: "#fff", fontSize: 16 },
});
