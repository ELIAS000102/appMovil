import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import LoginScreen from "@/screens/user/loginScreen";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ButtonLogin() {
  const [visible, setVisible] = React.useState(false);
  
  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          <Icon name="sign-in" size={18} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
      
      <LoginScreen visible={visible} onClose={() => setVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minWidth: 100,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
});