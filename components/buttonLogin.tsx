import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LoginScreen from "@/screens/user/loginScreen";
import themeManager from "@/Theme/ThemeManager";

export default function ButtonLogin() {
  const [visible, setVisible] = React.useState(false);
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

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          <Icon
            name="sign-in"
            size={18}
            color={theme.textPrimary}
            style={styles.icon}
          />
          <Text style={[styles.buttonText, { color: theme.textPrimary }]}>Login</Text>
        </View>
      </TouchableOpacity>

      <LoginScreen visible={visible} onClose={() => setVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 2,
      borderRadius: 8,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      minWidth: 100,
    },
    buttonContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
    },
    icon: {
      marginRight: 8,
    },
  });
