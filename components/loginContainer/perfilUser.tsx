import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, Pressable, Alert, StyleSheet,useColorScheme } from "react-native";
import { useAuth } from "../../authentication/useAuth";
import { logout } from "../../authentication/authService";
import { lightTheme, darkTheme } from "../../Theme/colors"; // Importa tus temas


const UserLogin = ({ onViewCart }: { onViewCart?: () => void }) => {
  const { user } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const colorScheme = useColorScheme();
    const theme = colorScheme === "light" ? darkTheme : lightTheme;

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
        style={[styles.profileImage,{ borderColor: theme.primary }]}
      />

      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={[styles.menuIcon,{color: theme.primary}]}>☰</Text>
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


export default UserLogin;

const styles = StyleSheet.create({
   container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    borderWidth: 3,
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
})
