import {Text, TouchableOpacity } from 'react-native'
import { style } from '../Styles/globalStyles' // Asegúrate de que la ruta sea correcta
import React from 'react'
import LoginScreen from '@/screens/user/loginScreen'

export default function buttonLogin() {
  const [visible, setVisible] = React.useState(false);
  return (
      <TouchableOpacity
        style={style.loginButtonHome}
        onPress={() =>setVisible(true) }
      >
        <LoginScreen visible={visible} onClose={() => setVisible(false)} />
        <Text style={style.textLoginButton}>Login</Text>
      </TouchableOpacity>
  )
}