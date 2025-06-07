import React, { useState, useRef } from "react";
import { TextInput, TouchableOpacity, Animated, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputWidth = useRef(new Animated.Value(0)).current;

  const toggleSearch = () => {
    if (searchVisible) {
      // Cerrar búsqueda: limpiar texto y animar ancho a 0
      Animated.timing(inputWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSearchVisible(false));
      setSearchTerm("");
      onSearch("");
    } else {
      // Abrir búsqueda: primero hacer visible y animar ancho a 250
      setSearchVisible(true);
      Animated.timing(inputWidth, {
        toValue: 250,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleSearch} style={styles.searchButton}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>

      <Animated.View style={[styles.searchInputWrapper, { width: inputWidth }]}>
        {searchVisible && (
          <TextInput
            placeholder="Buscar producto..."
            value={searchTerm}
            onChangeText={handleSearchChange}
            style={styles.searchInput}
            autoFocus
            clearButtonMode="while-editing"
          />
        )}
      </Animated.View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 8,
    height: 40,
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: "#2E7D32", // verde oscuro
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInputWrapper: {
    height: 40,
    marginLeft: 8,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    height: 40,
    width: "80%",
    backgroundColor: "#CBEDF2FF", // verde claro
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
