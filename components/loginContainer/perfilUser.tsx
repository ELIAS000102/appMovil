import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text, Pressable, Alert } from "react-native";
import { useAuth } from "../../authentication/useAuth";
import { logout } from "../../authentication/authService";

const UserLogin = ({ onViewCart }: { onViewCart?: () => void }) => {
  const { user } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  if (!user) return null;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Cerrar sesión", style: "destructive", onPress: () => {
        setMenuVisible(false);
        logout();
      }},
    ]);
  };

  const handleViewCart = () => {
    setMenuVisible(false);
    if (onViewCart) onViewCart();
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.profilePhoto }}
        style={styles.profileImage}
      />

      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.dropdownMenu}>
          <Pressable onPress={handleViewCart} style={styles.menuItem}>
            <Text>🛒 Ver carrito</Text>
          </Pressable>
          <Pressable onPress={handleLogout} style={styles.menuItem}>
            <Text>🔓 Cerrar sesión</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    fontSize: 24,
  },
  dropdownMenu: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 8,
  },
});

export default UserLogin;
