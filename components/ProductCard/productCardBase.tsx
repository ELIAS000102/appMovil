// components/ProductCardBase.tsx
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import themeManager from "@/Theme/ThemeManager";

type ProductCardBaseProps = {
  name: string;
  price: number;
  imageUrl: string;
  stock?: number;
  onPress?: () => void;
};

export default function ProductCardBase({
  name,
  price,
  imageUrl,
  stock = 0,
  onPress,
}: ProductCardBaseProps) {

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

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.cardContainer,{backgroundColor: theme.surface}]}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.productImage}
          resizeMode="cover"
        />
        {stock <= 5 && stock > 0 && (
          <View style={styles.stockBadge}>
            <Text style={styles.stockText}>Quedan solo {stock}</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.productName,{color: theme.primary,}]} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>S/. {price.toFixed(2)}</Text>
          {stock > 0 ? (
            <View style={styles.inStockIndicator} />
          ) : (
            <Text style={styles.outOfStockText}>Agotado</Text>
          )}
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={[styles.ratingText, {color: theme.textSecondary,}]}>4.8</Text>
          <Text style={[styles.reviewsText, {color: theme.textSecondary,}]}>(128)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 24;

const styles = StyleSheet.create({
    cardContainer: {
      width: CARD_WIDTH,
      borderRadius: 12,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: "hidden",
    },
    imageContainer: {
      width: "100%",
      height: CARD_WIDTH * 0.9,
      position: "relative",
    },
    productImage: {
      width: "100%",
      height: "100%",
    },
    stockBadge: {
      position: "absolute",
      top: 8,
      left: 8,
      backgroundColor: "rgba(255, 59, 48, 0.9)",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
    },
    stockText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "600",
    },
    infoContainer: {
      padding: 12,
    },
    productName: {
      fontSize: 15,
      fontWeight: "500",
      marginBottom: 8,
      height: 40,
    },
    priceContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6,
    },
    price: {
      fontSize: 16,
      fontWeight: "700",
      color: "#2a9d8f",
    },
    inStockIndicator: {
      backgroundColor: "#00FF00",
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    outOfStockText: {
      fontSize: 12,
      color: "#e53935",
      fontWeight: "500",
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingText: {
      fontSize: 12,
      marginLeft: 4,
      fontWeight: "600",
    },
    reviewsText: {
      fontSize: 12,
      marginLeft: 4,
    },
  });
