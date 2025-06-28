import { View, Text, Image, StyleSheet, Animated, Easing } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import themeManager from "../Theme/ThemeManager"; // ✅ Asegúrate que este es el path correcto

export default function LoadScreen() {
  const [theme, setTheme] = useState(themeManager.getTheme());
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const initTheme = async () => {
      await themeManager.init(); // ✅ Inicializa correctamente
      setTheme(themeManager.getTheme());
    };

    initTheme();

    const handleThemeChange = () => {
      setTheme(themeManager.getTheme());
    };

    themeManager.subscribe(handleThemeChange);
    return () => {
      themeManager.unsubscribe(handleThemeChange);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 4000);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3800,
        easing: Easing.out(Easing.sin),
        useNativeDriver: false,
      }),
    ]).start();

    dots.forEach((dot, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 300),
          Animated.timing(dot, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.logoContainer}>
          <Image
            source={
              theme.mode === "dark"
                ? require("../assets/recursos/logo Z oscuro.jpg")
                : require("../assets/recursos/logo Z claro.jpg")
            }
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.loadingContainer}>
          <Text style={[styles.text, { color: theme.primary }]}>Cargando</Text>
          <View style={styles.dotsContainer}>
            {dots.map((dot, index) => (
              <Animated.Text
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity: dot,
                    transform: [
                      {
                        translateY: dot.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -8],
                        }),
                      },
                    ],
                    color: theme.primary,
                  },
                ]}
              >
                .
              </Animated.Text>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.progressBarContainer,
            { backgroundColor: theme.surface },
          ]}
        >
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
                backgroundColor: theme.primary,
              },
            ]}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 40,
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
  },
  dotsContainer: {
    flexDirection: "row",
    marginLeft: 5,
  },
  dot: {
    fontSize: 28,
    fontWeight: "bold",
  },
  progressBarContainer: {
    height: 4,
    width: "80%",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 2,
  },
});
