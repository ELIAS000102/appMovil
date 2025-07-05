import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Login from "@/components/loginContainer/login";
import SignIn from "@/components/loginContainer/singIn";
import { lightTheme, darkTheme } from "../../Theme/colors";

interface LoginScreenProps {
  visible: boolean;
  onClose: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ visible, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? darkTheme : lightTheme;

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View
          style={[styles.modalBox, { backgroundColor: `${theme.surface}dd` }]}
        >
          <TouchableOpacity
            onPress={onClose}
            style={[
              styles.closeButtonLoginScreen,
              {
                backgroundColor: theme.primary,
                borderColor: theme.primary,
              },
            ]}
          >
            <Text style={[styles.closeText, { color: theme.textPrimary }]}>
              ✖
            </Text>
          </TouchableOpacity>

          {isLogin ? (
            <Login onSwitch={toggleForm} onClose={onClose} />
          ) : (
            <SignIn onSwitch={toggleForm} />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // fondo oscuro semitransparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  closeButtonLoginScreen: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  closeText: {
    fontSize: 20,
  },
});
