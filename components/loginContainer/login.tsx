import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { login } from "../../authentication/authService";
import { styles } from "../../Styles/globalStyles";

type LoginProps = {
  onSwitch: () => void;
  onClose: () => void;
};

const Login: React.FC<LoginProps> = ({ onSwitch, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <View style={styles.containerLogin}>
      <Text style={styles.titleLogin}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo electrónico"
        style={styles.inputLogin}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={{ width: "100%", position: "relative" }}>
        <TextInput
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          style={styles.inputLogin}
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
            color="gray"
          />
        </TouchableOpacity>
      </View>

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
