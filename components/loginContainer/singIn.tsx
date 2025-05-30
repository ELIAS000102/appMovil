import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "../../Styles/globalStyles";

const SignIn = ({ onSwitch }: { onSwitch: () => void }) => {
  return (
    <View style={styles.containerSingIn}>
      <Text style={styles.titleSingIn}>Registrarse</Text>
      <TextInput placeholder="Nombre completo" style={styles.inputSingIn} />
      <TextInput placeholder="Correo electrónico" style={styles.inputSingIn} />
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.inputSingIn} />
      <TouchableOpacity style={styles.buttonSingIn}>
        <Text style={styles.buttonTextSingIn}>Crear Cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSwitch}>
        <Text style={styles.switchTextSingIn}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;


