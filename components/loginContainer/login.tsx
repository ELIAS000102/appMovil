import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { loginUser } from "../../authService"; // Asegúrate de que la ruta sea correcta
import { styles } from "../../Styles/globalStyles"; // Asegúrate de que la ruta sea correcta

const Login = ({ onSwitch }: { onSwitch: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      console.log("Autenticación exitosa:", response);
      Alert.alert("Éxito", "Usuario autenticado");
    } catch (error: any) {
      console.log("Error al autenticar:", error);
      Alert.alert("Error", error.message || "Credenciales incorrectas");
    }
  };

  return (
    <View style={styles.containerLogin}>
      <Text style={styles.titleLogin}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Correo electrónico"
        style={styles.inputLogin}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.inputLogin}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.buttonTextLogin}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSwitch}>
        <Text style={styles.switchTextLogin}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;


