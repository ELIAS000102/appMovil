import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const SignIn = ({ onSwitch }: { onSwitch: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <TextInput placeholder="Nombre completo" style={styles.input} />
      <TextInput placeholder="Correo electrónico" style={styles.input} />
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSwitch}>
        <Text style={styles.switchText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  switchText: {
    color: "#28a745",
    textAlign: "center",
    marginTop: 10,
  },
});
