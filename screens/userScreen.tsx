import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function User() {
  // Estados para mostrar la contraseña o no
  const [showPassword, setShowPassword] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Estados de edición individual
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  // Datos del usuario
  const [name, setName] = useState('Juan Pérez');
  const [email, setEmail] = useState('usuario@email.com');
  const [password, setPassword] = useState('12345678');
  const [address, setAddress] = useState('Calle 123, Ciudad');
  const [phone, setPhone] = useState('555-123-4567');

  return (
    <ScrollView style={styles.container}>
      {/* Foto de perfil */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/7f/9e/f5/7f9ef552cb071c696e932222260af318.jpg' }} // Aquí colocas la URL de la foto de perfil
          style={styles.profileImage}
        />
        <Text style={styles.name}>{name}</Text>
      </View>

      {/* Email */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>Correo:</Text>
        {isEditingEmail ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        ) : (
          <Text style={styles.value}>{email}</Text>
        )}
        <TouchableOpacity
          onPress={() => setIsEditingEmail(!isEditingEmail)}
          style={styles.editButton}
        >
          <Icon name="pencil" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Contraseña */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>Contraseña:</Text>
        <Text style={styles.value}>
          {showPassword ? password : '********'}
        </Text>
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeButton}
        >
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Nombre de usuario */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>Nombre de usuario:</Text>
        {isEditingName ? (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        ) : (
          <Text style={styles.value}>{name}</Text>
        )}
        <TouchableOpacity
          onPress={() => setIsEditingName(!isEditingName)}
          style={styles.editButton}
        >
          <Icon name="pencil" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Número de teléfono */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>Teléfono:</Text>
        {isEditingPhone ? (
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />
        ) : (
          <Text style={styles.value}>{phone}</Text>
        )}
        <TouchableOpacity
          onPress={() => setIsEditingPhone(!isEditingPhone)}
          style={styles.editButton}
        >
          <Icon name="pencil" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Dirección */}
      <View style={styles.infoSection}>
        <Text style={styles.label}>Dirección:</Text>
        <Text style={styles.value}>{address}</Text>
      </View>

      {/* Botón del carrito de compras */}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => setShowCart(true)}
      >
        <Icon name="shopping-cart" size={20} color="white" />
        <Text style={styles.cartButtonText}>Ver carrito</Text>
      </TouchableOpacity>

      {/* Modal para el carrito */}
      <Modal
        visible={showCart}
        animationType="slide"
        onRequestClose={() => setShowCart(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Carrito de compras</Text>
          {/* Aquí colocas los items del carrito */}
          <Text>Producto 1</Text>
          <Text>Producto 2</Text>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setShowCart(false)}
          >
            <Text style={styles.closeModalText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  value: {
    flex: 2,
    fontSize: 16,
  },
  input: {
    flex: 2,
    borderBottomWidth: 1,
    borderColor: 'gray',
    fontSize: 16,
  },
  eyeButton: {
    marginLeft: 10,
  },
  editButton: {
    marginLeft: 10,
  },
  cartButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
  },
  cartButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 20,
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  closeModalText: {
    color: 'white',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
