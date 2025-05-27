import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Login from "@/components/loginContainer/login";
import SignIn from "@/components/loginContainer/singIn";

interface LoginScreenProps {
  visible: boolean;
  onClose: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ visible, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.modalBox}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✖</Text>
          </TouchableOpacity>

          {isLogin ? (
            <Login onSwitch={toggleForm} />
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
    backgroundColor: "rgba(255,255,255,0.85)", // fondo blanco semitransparente
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
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
    color: "#444",
    fontWeight: "bold",
  },
});
