import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import themeManager from "@/Theme/ThemeManager";


const SignIn = ({ onSwitch }: { onSwitch: () => void }) => {
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
    <View style={[styles.containerSingIn, { backgroundColor: theme.background }]}>
      <Text style={[styles.titleSingIn, {color: theme.primary}]}>Registrarse</Text>
      <TextInput placeholder="Nombre completo" placeholderTextColor={theme.secondary} style={[styles.inputSingIn, {borderColor: theme.secondary, color: theme.secondary} ]} />
      <TextInput placeholder="Correo electrónico" secureTextEntry placeholderTextColor={theme.secondary} style={[styles.inputSingIn, {borderColor: theme.secondary, color: theme.secondary} ]} />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        placeholderTextColor={theme.secondary}
        style={[styles.inputSingIn, {borderColor: theme.secondary, color: theme.secondary} ]}
      />
      <TouchableOpacity style={[styles.buttonSingIn, {backgroundColor: theme.primary}]}>
        <Text style={[styles.buttonTextSingIn, {color: theme.textPrimary}]}>Crear Cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSwitch}>
        <Text style={[styles.switchTextSingIn, {color: theme.primary}]}>
          ¿Ya tienes cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  containerSingIn: {
    padding: 24,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  titleSingIn: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputSingIn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
  },
  buttonSingIn: {

    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonTextSingIn: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  switchTextSingIn: {
    textAlign: "center",
    marginTop: 10,
  },
});
