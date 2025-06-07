import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../authentication/useAuth';
import { updateUser, logout } from '../authentication/authService';

export default function User() {
  const { user } = useAuth();
  const [editableUser, setEditableUser] = useState({ ...user });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  if (!user) return null;

  const handleChange = (field: string, value: string) => {
    setEditableUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditField = (field: string) => {
    setEditingField(field);
  };

  const handleFinishEditing = () => {
    Alert.alert(
      '¿Guardar cambios?',
      '¿Deseas guardar los cambios realizados?',
      [
        {
          text: 'Cancelar',
          onPress: () => {
            setEditableUser({ ...user });
            setEditingField(null);
          },
          style: 'cancel',
        },
        {
          text: 'Guardar',
          onPress: () => {
            updateUser(editableUser);
            setEditingField(null);
            Alert.alert('Guardado', 'La información ha sido actualizada.');
          },
        },
      ]
    );
  };

  const EditableField = ({
    label,
    field,
    value,
    isPassword = false,
  }: {
    label: string;
    field: string;
    value: string;
    isPassword?: boolean;
  }) => (
    <View style={styles.infoSection}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.fieldContainer}>
        {editingField === field ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(val) => handleChange(field, val)}
            onBlur={handleFinishEditing}
            autoFocus
            secureTextEntry={isPassword && !showPassword}
          />
        ) : (
          <View style={styles.valueContainer}>
            <Text style={styles.value}>
              {isPassword && !showPassword ? '••••••••' : value || '-'}
            </Text>

            <View style={styles.iconsContainer}>
              {isPassword && (
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.iconButton}
                >
                  <Icon
                    name={showPassword ? 'eye-slash' : 'eye'}
                    size={18}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              )}

              <TouchableOpacity 
                onPress={() => handleEditField(field)}
                style={styles.iconButton}
              >
                <Icon name="edit" size={18} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: user.profilePhoto || 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editPhotoButton}>
            <Icon name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{editableUser.username}</Text>
      </View>

      <View style={styles.card}>
        <EditableField label="Correo electrónico" field="email" value={editableUser.email || ''} />
        <View style={styles.divider} />
        <EditableField label="Contraseña" field="password" value={editableUser.password || ''} isPassword />
        <View style={styles.divider} />
        <EditableField label="Nombre de usuario" field="username" value={editableUser.username || ''} />
        <View style={styles.divider} />
        <EditableField label="Teléfono" field="phone" value={editableUser.phone || ''} />
        <View style={styles.divider} />
        <EditableField label="Dirección" field="address" value={editableUser.address || ''} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
        <Icon name="sign-out" size={18} color="white" style={styles.logoutIcon} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 24,
    marginBottom: 16,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#e2e8f0',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3b82f6',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoSection: {
    paddingVertical: 12,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 6,
    fontWeight: '500',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
    flex: 1,
  },
  input: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
    paddingVertical: 6,
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  iconButton: {
    padding: 6,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 4,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    padding: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 8,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutIcon: {
    marginLeft: 10,
  },
});