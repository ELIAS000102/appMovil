// src/components/switchTheme.tsx
import React, { useEffect, useState } from "react";
import { View, Switch, StyleSheet } from "react-native";
import themeManager from "@/Theme/ThemeManager"; // Asegúrate que el path sea correcto

const ToggleSwitch = () => {
  const [mode, setMode] = useState<"light" | "dark">(themeManager.getMode());

  useEffect(() => {
    // Suscribirse a los cambios del tema
    themeManager.subscribe(setMode);
    return () => {
      themeManager.unsubscribe(setMode);
    };
  }, []);

  const isDarkMode = mode === "dark";

  const handleToggle = () => {
    themeManager.toggleTheme(); // Esto también notificará a todos los que están suscritos
  };

  return (
    <View style={styles.container}>
      <Switch
        value={isDarkMode}
        onValueChange={handleToggle}
        trackColor={{ false: "#ccc", true: "#444" }}
        thumbColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ToggleSwitch;
