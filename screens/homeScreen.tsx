import { ScrollView, View, Text} from "react-native";
import ProductCard from "../components/productCard";
import { products } from "../products/products";
import React, { useState } from "react";
import SearchBar from "../components/productFilter";
import ButtonLogin from "@/components/buttonLogin";
import { StyleSheet } from "react-native";
import {styles} from "../Styles/globalStyles";


export default function Galeria() {
  const [searchTerm, setSearchTerm] = useState("");

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
    <><View>
      <Text style={styles.galeryTitle}>Galería de Productos</Text>
    </View><View style={{ flex: 1, padding: 10 }}>
        {/* 🔍 Agregar SearchBar */}
        <View style={styles.searchContainer}>
          <SearchBar onSearch={handleSearch} />
          <ButtonLogin />
        </View>
        <ScrollView contentContainerStyle={styles.containerProducts}>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              onPress={() => {
                console.log(`${product.name} SELECCIOONADO`);
              } } />
          ))}
        </ScrollView>
      </View></>
  );
}

