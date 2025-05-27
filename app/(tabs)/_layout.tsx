import { Tabs } from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={26} />
          ),
          animation: "shift",
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
          animation: 'shift',
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
          animation: "shift",
        }}
      />
    </Tabs>
  );
}
