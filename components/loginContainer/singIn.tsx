import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import themeManager from "@/Theme/ThemeManager";
import axios from "axios";

const API_URL = "https://servidorshopapp-hmeuhvejdudchfc3.canadaeast-01.azurewebsites.net/usuarios"; // Reemplaza por tu URL real

const SignIn = ({ onSwitch }: { onSwitch: () => void }) => {
  const [mode, setMode] = useState<"light" | "dark">(themeManager.getMode());
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      await themeManager.init();
      setMode(themeManager.getMode());
      themeManager.subscribe(setMode);
    };

    loadTheme();
    return () => {
      themeManager.unsubscribe(setMode);
    };
  }, []);

  const theme = themeManager.getTheme();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Campos incompletos", "Completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/registro`, {
        username,
        email,
        password,
        profilePhoto: "", // Puedes pedir este campo más adelante
        phone: "",
        address: "",
        status: "user", // Por defecto es usuario
      });

      Alert.alert("Éxito", "Cuenta creada correctamente.");
      onSwitch(); // Cambiar a login
    } catch (error: any) {
      Alert.alert("Error", "No se pudo registrar el usuario.");
      console.error("Error al registrar:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.containerSingIn, { backgroundColor: theme.background }]}>
      <Text style={[styles.titleSingIn, { color: theme.primary }]}>Registrarse</Text>

      <TextInput
        placeholder="Nombre completo"
        placeholderTextColor={theme.secondary}
        style={[styles.inputSingIn, { borderColor: theme.secondary, color: theme.secondary }]}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor={theme.secondary}
        autoCapitalize="none"
        keyboardType="email-address"
        style={[styles.inputSingIn, { borderColor: theme.secondary, color: theme.secondary }]}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        placeholderTextColor={theme.secondary}
        style={[styles.inputSingIn, { borderColor: theme.secondary, color: theme.secondary }]}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.buttonSingIn, { backgroundColor: theme.primary }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={theme.textPrimary} />
        ) : (
          <Text style={[styles.buttonTextSingIn, { color: theme.textPrimary }]}>
            Crear Cuenta
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitch}>
        <Text style={[styles.switchTextSingIn, { color: theme.primary }]}>
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
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
  },
  buttonSingIn: {
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonTextSingIn: {
    fontWeight: "bold",
  },
  switchTextSingIn: {
    textAlign: "center",
    marginTop: 10,
  },
});
