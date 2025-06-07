import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

export default function LoadScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Animación de puntos
  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 4000);

    // Animación de entrada
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

    // Animación de puntos
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
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        {/* Logo con sombra */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/recursos/0e67e2c0e385c0a8cc4741968ca9a9cb.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Texto de carga con animación de puntos */}
        <View style={styles.loadingContainer}>
          <Text style={styles.text}>Cargando</Text>
          <View style={styles.dotsContainer}>
            {dots.map((dot, index) => (
              <Animated.Text 
                key={index} 
                style={[
                  styles.dot,
                  { 
                    opacity: dot,
                    transform: [{ translateY: dot.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -8]
                    }) }] 
                  }
                ]}
              >
                .
              </Animated.Text>
            ))}
          </View>
        </View>

        {/* Barra de progreso */}
        <View style={styles.progressBarContainer}>
          <Animated.View 
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              }
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
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  dot: {
    fontSize: 28,
    color: '#4a6da7',
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 4,
    width: '80%',
    backgroundColor: '#e9ecef',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4a6da7',
    borderRadius: 2,
  },
});