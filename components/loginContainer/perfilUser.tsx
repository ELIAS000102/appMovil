import React from "react";
import { Image, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../authentication/useAuth";
import { logout } from "../../authentication/authService";

const UserLogin = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Cerrar sesión", style: "destructive", onPress: logout },
    ]);
  };

  if (!user) return null;

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Image
        source={{ uri: user.profilePhoto }}
        style={{ width: 40, height: 40, borderRadius: 20,justifyContent: 'space-between'}}
      />
    </TouchableOpacity>
  );
};

export default UserLogin;
