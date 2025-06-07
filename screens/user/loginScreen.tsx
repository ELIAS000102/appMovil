import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import Login from "@/components/loginContainer/login";
import SignIn from "@/components/loginContainer/singIn";
import { styles } from "@/Styles/globalStyles";

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
