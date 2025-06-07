import { Tabs } from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#A0C4FF", // azul claro
        tabBarStyle: {
          backgroundColor: "#1E40AF", // azul oscuro
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 10,
          height: 90,
          paddingBottom: 10,
          paddingTop: 10,
          position: "absolute",
          bottom: 10,
          left: 20,
          right: 20,
          marginHorizontal: 20,
          zIndex: 100,
          borderRadius: 40,
          overflow: "hidden",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor: "#1E40AF", // azul oscuro
        },
        headerTintColor: "#fff",
        animation: "fade",
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
          headerPressOpacity: 0,
          tabBarIcon: ({ color }) => (
            <Feather name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tabs>
  );
}
