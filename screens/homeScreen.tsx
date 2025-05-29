import { ScrollView, View, Text} from "react-native";
import ProductCard from "../components/productCard";
import { products } from "../products/products";
import React, { useState } from "react";
import SearchBar from "../components/productFilter";
import ButtonLogin from "@/components/buttonLogin";
import { StyleSheet } from "react-native";


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
      <Text style={style.galery_title}>Galería de Productos</Text>
    </View><View style={{ flex: 1, padding: 10 }}>
        {/* 🔍 Agregar SearchBar */}
        <View style={style.searchContainer}>
          <SearchBar onSearch={handleSearch} />
          <ButtonLogin />
        </View>
        <ScrollView contentContainerStyle={style.containerProducts}>
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

const style = StyleSheet.create({
   galery_title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 30,
  },

    containerProducts: {
    padding: 10,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
})
