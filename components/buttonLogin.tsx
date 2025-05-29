import { Text, TouchableOpacity } from "react-native";
import React from "react";
import LoginScreen from "@/screens/user/loginScreen";
import { StyleSheet } from "react-native";

export default function buttonLogin() {
  const [visible, setVisible] = React.useState(false);
  return (
    <TouchableOpacity
      style={style.loginButtonHome}
      onPress={() => setVisible(true)}
    >
      <LoginScreen visible={visible} onClose={() => setVisible(false)} />
      <Text style={style.textLoginButton}>Login</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  loginButtonHome: {
    backgroundColor: "#2C3E50",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    position: "absolute", // 🟡 CLAVE
    right: 10,
    width: 70, // ancho del botón
    height: 40, // alto del botón
  },

  textLoginButton: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
