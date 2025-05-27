import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

export default function LoadScreen() {
  const router = useRouter();

  // Referencias para animaciones de 4 barras
  const bars = [
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 5000);

    // Animación de barras
    bars.forEach((bar, index) => {
      const animateBar = () => {
        Animated.sequence([
          Animated.timing(bar, {
            toValue: 2,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(bar, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start(() => animateBar());
      };

      // Empieza cada barra con un retardo
      setTimeout(animateBar, index * 150);
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/recursos/0e67e2c0e385c0a8cc4741968ca9a9cb.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Texto de carga */}
      <Text style={styles.text}>Cargando...</Text>

      {/* Barras animadas */}
      <View style={styles.barsContainer}>
        {bars.map((bar, index) => (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              { transform: [{ scaleY: bar }] },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Fondo blanco
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 60,
  },
  bar: {
    width: 10,
    height: 40,
    backgroundColor: '#007AFF',
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
