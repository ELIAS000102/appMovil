// app/Layout.tsx
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";
import * as SystemUI from "expo-system-ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import themeManager from "@/Theme/ThemeManager"; // Asegúrate que el path sea correcto

export default function Layout() {
  const insets = useSafeAreaInsets();

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

  useEffect(() => {
    // Cambia la barra inferior de Android
    SystemUI.setBackgroundColorAsync(theme.primary);
  }, [theme]);

  return (
    <>
      {/* Color del notch para Android */}
      {Platform.OS === "android" && (
        <View
          style={{
            height: insets.top,
            backgroundColor: theme.primary,
          }}
        />
      )}

      {/* Barra de estado superior */}
      <StatusBar translucent style={mode === "dark" ? "light" : "light"} />

      {/* Navegación de la app */}
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
