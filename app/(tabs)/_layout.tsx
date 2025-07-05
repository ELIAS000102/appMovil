import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import themeManager from "@/Theme/ThemeManager"; // Asegúrate que el path sea correcto

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const [mode, setMode] = useState<"light" | "dark">(themeManager.getMode());

  useEffect(() => {
    themeManager.subscribe(setMode);
    return () => {
      themeManager.unsubscribe(setMode);
    };
  }, []);

  const theme = themeManager.getTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.textPrimary,
        tabBarInactiveTintColor: theme.onPrimary,
        tabBarStyle: {
          ...styles.tabBar,
          backgroundColor: theme.primary,
          height: 60 + insets.bottom,
          paddingBottom: 10 + insets.bottom / 2,
        },
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.tabItem,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={
                focused ? styles.iconContainerFocused : styles.iconContainer
              }
            >
              <FontAwesome
                name="home"
                color={color}
                size={20}
                style={focused ? styles.iconFocused : undefined}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={
                focused ? styles.iconContainerFocused : styles.iconContainer
              }
            >
              <FontAwesome
                name="user"
                color={color}
                size={20}
                style={focused ? styles.iconFocused : undefined}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={
                focused ? styles.iconContainerFocused : styles.iconContainer
              }
            >
              <Feather
                name="settings"
                color={color}
                size={20}
                style={focused ? styles.iconFocused : undefined}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  tabItem: {
    paddingVertical: 6,
    height: 50,
  },
  iconContainer: {
    padding: 4,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainerFocused: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconFocused: {
    transform: [{ scale: 1.05 }],
  },
});
