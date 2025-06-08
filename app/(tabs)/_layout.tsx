import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: [
          styles.tabBar,
          {
            height: 60 + insets.bottom,
            paddingBottom: 10 + insets.bottom / 2,
          }
        ],
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
            <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
              <FontAwesome 
                name="home" 
                color={color} 
                size={20} // Tamaño reducido para mejor proporción
                style={focused ? styles.iconFocused : null}
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
            <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
              <FontAwesome 
                name="user" 
                color={color} 
                size={20} // Tamaño reducido para mejor proporción
                style={focused ? styles.iconFocused : null}
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
            <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
              <Feather 
                name="settings" 
                color={color} 
                size={20} // Tamaño reducido para mejor proporción
                style={focused ? styles.iconFocused : null}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4, // Ajuste para mejor alineación
  },
  tabItem: {
    paddingVertical: 6,
    height: 50, // Altura fija para los items
  },
  iconContainer: {
    padding: 4, // Reducido para mejor proporción
    borderRadius: 12, // Reducido para mejor proporción
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerFocused: {
    padding: 4, // Reducido para mejor proporción
    borderRadius: 12, // Reducido para mejor proporción
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconFocused: {
    transform: [{ scale: 1.05 }], // Efecto sutil de escala
  },
});