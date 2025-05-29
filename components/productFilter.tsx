// src/components/SearchBar.tsx

import React, { useState, useRef } from "react";
import { TextInput, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface SearchBarProps {
  onSearch: (term: string) => void; // Función que se llamará al buscar
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputWidth = useRef(new Animated.Value(0)).current;

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
    Animated.timing(inputWidth, {
      toValue: searchVisible ? 0 : 250,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    onSearch(text); // Llamamos la función onSearch para pasar el término
  };

  return (
    <React.Fragment>
      {/* 🔍 Área de búsqueda */}
      <TouchableOpacity onPress={toggleSearch} style={style.searchButton}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>

      <Animated.View style={[style.searchInputWrapper, { width: inputWidth }]}>
        {searchVisible && (
          <TextInput
            placeholder="Buscar producto..."
            value={searchTerm}
            onChangeText={handleSearchChange}
            style={style.searchInput}
            autoFocus
          />
        )}
      </Animated.View>
    </React.Fragment>
  );
};

export default SearchBar;

const style = StyleSheet.create({
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: "#2C3E50", // azul oscuro
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  searchInputWrapper: {
    marginLeft: 10,
    overflow: "hidden",
  },

  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "white", // gris claro profesional
    borderRadius: 10,
    width: 240, // ancho del input
    color: "black", // texto azul oscuro
  },
});
