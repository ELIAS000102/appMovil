import { Text, Image, TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import ProductDetails from "./productDetails";
import { Ionicons } from "@expo/vector-icons";

type ProductCardProps = {
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  stock?: number;
  onPress?: () => void;
};

export default function ProductCard({
  name,
  price,
  imageUrl,
  description = "No description available",
  stock = 0,
}: ProductCardProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.cardContainer}
        activeOpacity={0.9}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.productImage}
            resizeMode="cover"
          />
          
          {/* Stock indicator */}
          {stock <= 5 && stock > 0 && (
            <View style={styles.stockBadge}>
              <Text style={styles.stockText}>Solo {stock} left</Text>
            </View>
          )}
          
          {/* Favorite button */}
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.productName} numberOfLines={2}>{name}</Text>
          
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
            <Text style={styles.ratingText}>4.8</Text>
            <Text style={styles.reviewsText}>(128)</Text>
          </View>
        </View>
      </TouchableOpacity>

      <ProductDetails
        visible={visible}
        onClose={() => setVisible(false)}
        name={name}
        price={price}
        imageUrl={imageUrl}
        description={description}
        stock={stock}
      />
    </>
  );
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 24;

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 0.9,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  stockBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  stockText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    height: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2a9d8f',
  },
  inStockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  outOfStockText: {
    fontSize: 12,
    color: '#e53935',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
    fontWeight: '600',
  },
  reviewsText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
});