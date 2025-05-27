import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Settings() {
  return (
    <View
    style={style.container}>
      <Text style={style.text}>Ajustes</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text:{
    fontSize: 20,
    color: 'black',
  }
})