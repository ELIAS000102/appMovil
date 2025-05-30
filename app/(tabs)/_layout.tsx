import { Tabs } from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffffff", // Iconos activos en blanco
        tabBarInactiveTintColor: "#D1B2E0", // Iconos inactivos en morado claro
        tabBarStyle: {
          backgroundColor: "#5E2A84", // Fondo morado oscuro
          borderTopWidth: 0, // Sin borde superior
          elevation: 10, // Sombra para Android
          shadowColor: "#000", // Sombra para iOS
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 10,
          borderTopLeftRadius: 50, // Bordes redondeados
          borderTopRightRadius: 50,
          height: 100, // Altura más grande
          paddingBottom: 10, // Espacio para los iconos
          paddingTop: 10, // Espacio para los iconos
          position: "absolute", // Posición absoluta para evitar superposición
          bottom: 0, // Alinear al fondo de la pantalla
          left: 0,
          right: 0, // Alinear a los lados de la pantalla 
          zIndex: 100, // Asegurar que esté por encima de otros componentes
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor: "#5E2A84", // Color morado oscuro para la barra superior
        },
        headerTintColor: "#fff", // Texto blanco en la barra superior
        animation: "fade", // Animación de transición más fluida
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Usuario",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tabs>
  );
}
