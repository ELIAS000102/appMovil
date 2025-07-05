import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform, View } from 'react-native';
import HomeScreen from '../../screens/homeScreen';

const Home = () => {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <HomeScreen />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
