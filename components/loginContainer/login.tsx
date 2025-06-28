import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { login } from "../../authentication/authService";
import themeManager from "@/Theme/ThemeManager";

type LoginProps = {
  onSwitch: () => void;
  onClose: () => void;
};

const Login: React.FC<LoginProps> = ({ onSwitch, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      Alert.alert("Bienvenido", `Hola ${user.username}`);
      onClose();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={[styles.containerLogin, { backgroundColor: theme.background }]}>
      <Text style={[styles.titleLogin, { color: theme.primary }]}>
        Iniciar Sesión
      </Text>

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor={theme.textSecondary}
        style={[
          styles.inputLogin,
          {
            borderColor: theme.textSecondary,
            color: theme.textSecondary,
          },
        ]}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={{ width: "100%", position: "relative" }}>
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={theme.textSecondary}
          secureTextEntry={!showPassword}
          style={[
            styles.inputLogin,
            {
              borderColor: theme.textSecondary,
              color: theme.textSecondary,
            },
          ]}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: 10,
            top: 7,
            padding: 5,
          }}
        >
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color={theme.primary}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.buttonLogin, { backgroundColor: theme.primary }]}
        onPress={handleLogin}
      >
        <Text style={[styles.buttonTextLogin, { color: theme.textPrimary }]}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitch}>
        <Text style={[styles.switchTextLogin, { color: theme.primary }]}>
          ¿No tienes cuenta? Regístrate
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  containerLogin: {
    padding: 24,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  titleLogin: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputLogin: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
  },
  buttonLogin: {
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonTextLogin: {
    textAlign: "center",
    fontWeight: "bold",
  },
  switchTextLogin: {
    textAlign: "center",
    marginTop: 10,
  },
});
