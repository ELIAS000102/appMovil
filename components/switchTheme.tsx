// src/components/switchTheme.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import themeManager from "@/Theme/ThemeManager";

const ToggleSwitch = () => {
  const [mode, setMode] = useState<"light" | "dark">(themeManager.getMode());
  const animation = useRef(new Animated.Value(mode === "dark" ? 1 : 0)).current;

  useEffect(() => {
    themeManager.subscribe((newMode) => {
      setMode(newMode);
      animateToggle(newMode === "dark");
    });
    return () => {
      themeManager.unsubscribe(setMode);
    };
  }, []);

  const theme = themeManager.getTheme();
  const isDarkMode = mode === "dark";

  const animateToggle = (toDark: boolean) => {
    Animated.timing(animation, {
      toValue: toDark ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleTheme = () => {
    themeManager.toggleTheme(); // Esto disparará la animación desde el listener
  };

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 36],
  });

  return (
    <View style={styles.container}>
      {/* Icono de sol (claro) */}
      <Icon
        name="sun"
        size={22}
        color={isDarkMode ? theme.textSecondary : theme.primary}
        style={styles.icon}
      />

      {/* Switch personalizado */}
      <TouchableWithoutFeedback onPress={toggleTheme}>
        <View
          style={[
            styles.switchContainer,
            { backgroundColor: theme.onPrimary },
          ]}
        >
          <Animated.View
            style={[
              styles.thumb,
              {
                backgroundColor: theme.primary,
                transform: [{ translateX }],
              },
            ]}
          />
        </View>
      </TouchableWithoutFeedback>

      {/* Icono de luna (oscuro) */}
      <Icon
        name="moon"
        size={20}
        color={isDarkMode ? theme.primary : theme.textSecondary}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    gap: 10,
  },
  switchContainer: {
    width: 68,
    height: 32,
    borderRadius: 20,
    padding: 3,
    justifyContent: "center",
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  icon: {
    paddingHorizontal: 6,
  },
});

export default ToggleSwitch;
