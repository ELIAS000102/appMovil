import { Text, TouchableOpacity } from "react-native";
import React from "react";
import LoginScreen from "@/screens/user/loginScreen";
import { styles } from "@/Styles/globalStyles";

export default function buttonLogin() {
  const [visible, setVisible] = React.useState(false);
  return (
    <TouchableOpacity
      style={styles.loginButtonHome}
      onPress={() => setVisible(true)}
    >
      <LoginScreen visible={visible} onClose={() => setVisible(false)} />
      <Text style={styles.textLoginButton}>Login</Text>
    </TouchableOpacity>
  );
}
