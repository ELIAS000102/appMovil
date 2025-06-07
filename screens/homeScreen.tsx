import { ScrollView, View, Text, StyleSheet, SafeAreaView } from "react-native";
import ProductCard from "../components/productCard";
import { products } from "../database/products";
import React, { useState } from "react";
import SearchBar from "../components/productFilter";
import ButtonLogin from "@/components/buttonLogin";
import UserLogin from "@/components/loginContainer/perfilUser";
import { styles as globalStyles } from "../Styles/globalStyles";
import { useAuth } from "../authentication/useAuth";

export default function Galeria() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth(); // 🔐 accede al usuario autenticado

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredProducts = products.filter((product) =>
    normalizeText(product.name).includes(normalizeText(searchTerm))
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header con barra de búsqueda y login */}
        <View style={styles.header}>
          <View style={styles.leftContainer}>
            <SearchBar onSearch={handleSearch} />
          </View>
          <View style={styles.rightContainer}>
            {user ? <UserLogin /> : <ButtonLogin />}
          </View>
        </View>

        {/* Lista de productos */}
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
                Intenta con otros términos de búsqueda
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Alinea a la izquierda
  },
  rightContainer: {
    justifyContent: 'flex-end', // Alinea a la derecha
  },
  productsContainer: {
    paddingBottom: 180,
  },
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
  emptySubtext: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },
});
