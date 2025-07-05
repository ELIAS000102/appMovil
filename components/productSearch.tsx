import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
  Animated,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import themeManager from "@/Theme/ThemeManager";


interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [mode, setMode] = useState<"light" | "dark">(themeManager.getMode());

  useEffect(() => {
    const loadTheme = async () => {
      await themeManager.init(); // Carga desde AsyncStorage
      setMode(themeManager.getMode());
      themeManager.subscribe(setMode);
    };

    loadTheme();

    return () => {
      themeManager.unsubscribe(setMode);
    };
  }, []);

  const theme = themeManager.getTheme();

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputWidth = useRef(new Animated.Value(0)).current;

  const toggleSearch = () => {
    if (searchVisible) {
      Animated.timing(inputWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSearchVisible(false));
      setSearchTerm("");
      onSearch("");
    } else {
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
    <View style={styles.containerSearch}>
      <TouchableOpacity onPress={toggleSearch} style={[styles.searchButton, {backgroundColor: theme.primary,}]}>
        <Ionicons name="search" size={24} color={theme.textPrimary} />
      </TouchableOpacity>

      <Animated.View style={[styles.searchInputWrapper, { width: inputWidth }]}>
        {searchVisible && (
          <TextInput
            placeholder="Buscar producto..."
            placeholderTextColor={theme.primary}
            value={searchTerm}
            onChangeText={handleSearchChange}
            style={[styles.searchInput, { backgroundColor: theme.surface, color: theme.textSecondary }]}
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
    containerSearch: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 25,
      paddingHorizontal: 8,
      height: 40,
    },
    searchButton: {
      width: 40,
      height: 40,
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
      width: "85%",
      borderRadius: 20,
      paddingHorizontal: 12,
      fontSize: 16,
    },
  });
