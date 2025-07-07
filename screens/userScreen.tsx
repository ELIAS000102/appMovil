// User.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../authentication/useAuth';
import { updateUser, logout } from '../authentication/authService';
import LoginScreen from './user/loginScreen';
import ManageProducts from '../components/adminComponents/ManageProducts';
import themeManager from '@/Theme/ThemeManager';

type EditableFieldKey = 'username' | 'email' | 'password' | 'phone' | 'address';

const EditableField = React.memo(
  ({
    label,
    field,
    value,
    isPassword = false,
    isEditing,
    onChange,
    onStartEdit,
    onEndEdit,
    showPassword,
    togglePassword,
    themedStyles,
  }: {
    label: string;
    field: EditableFieldKey;
    value: string;
    isPassword?: boolean;
    isEditing: boolean;
    onChange: (value: string) => void;
    onStartEdit: () => void;
    onEndEdit: () => void;
    showPassword: boolean;
    togglePassword: () => void;
    themedStyles: {
      labelUser: any;
      valueUser: any;
      iconColor: string;
      editIconColor: string;
    };
  }) => {
    return (
      <View style={styles.infoSectionUser}>
        <Text style={themedStyles.labelUser}>{label}</Text>
        <View style={styles.fieldContainerUser}>
          {isEditing ? (
            <TextInput
              style={[styles.inputUser, { color: themedStyles.valueUser.color }]}
              value={value}
              onChangeText={onChange}
              onBlur={onEndEdit}
              autoFocus
              secureTextEntry={isPassword && !showPassword}
            />
          ) : (
            <View style={styles.valueContainerUser}>
              <Text style={themedStyles.valueUser}>
                {isPassword && !showPassword ? '••••••••' : value || '-'}
              </Text>
              <View style={styles.iconsContainerUser}>
                {isPassword && (
                  <TouchableOpacity onPress={togglePassword} style={styles.iconButtonUser}>
                    <Icon
                      name={showPassword ? "eye-slash" : "eye"}
                      size={18}
                      color={themedStyles.iconColor}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={onStartEdit} style={styles.iconButtonUser}>
                  <Icon name="edit" size={18} color={themedStyles.editIconColor} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
);

export default function User() {
  const { user } = useAuth();
  const [editableUser, setEditableUser] = useState(user ? { ...user } : null);
  const [editingField, setEditingField] = useState<EditableFieldKey | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [mode, setMode] = useState<'light' | 'dark'>(themeManager.getMode());

  useEffect(() => {
    const loadTheme = async () => {
      await themeManager.init();
      setMode(themeManager.getMode());
      themeManager.subscribe(setMode);
    };
    loadTheme();
    return () => {
      themeManager.unsubscribe(setMode);
    };
  }, []);

  const theme = themeManager.getTheme();

  const themedStyles = {
    labelUser: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 6,
      fontWeight: '500',
    },
    valueUser: {
      fontSize: 16,
      color: theme.secondary,
      fontWeight: '500',
      flex: 1,
    },
    iconColor: theme.primary,
    editIconColor: theme.primary,
  };

  useEffect(() => {
    if (user && !editingField) {
      setEditableUser({ ...user });
    }
  }, [user, editingField]);

  if (!user || !editableUser) {
    return (
      <View style={[styles.centeredUser, { backgroundColor: theme.background }]}>
        <Icon name="user-circle" size={100} color={theme.primary} />
        <Text style={[styles.messageUser, { color: theme.textSecondary }]}>
          Inicia sesión para ver tu perfil.
        </Text>
        <TouchableOpacity
          style={[styles.loginButtonUser, { backgroundColor: theme.primary }]}
          onPress={() => setShowLogin(true)}
        >
          <Text style={[styles.loginButtonTextUser, { color: theme.textPrimary }]}>
            Iniciar sesión
          </Text>
        </TouchableOpacity>
        {showLogin && <LoginScreen onClose={() => setShowLogin(false)} visible={true} />}
      </View>
    );
  }

  const handleChange = (field: EditableFieldKey, value: string) => {
    setEditableUser((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleFinishEditing = () => {
    if (!editableUser.username || !editableUser.email) {
      Alert.alert('Campos obligatorios', 'El nombre de usuario y correo electrónico son requeridos.');
      return;
    }

    Alert.alert('¿Guardar cambios?', '¿Deseas guardar los cambios realizados?', [
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
        onPress: async () => {
          try {
            await updateUser(editableUser);
            setEditingField(null);
            Alert.alert('Guardado', 'La información ha sido actualizada.');
          } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar la información del usuario.');
          }
        },
      },
    ]);
  };

  const fields: {
    label: string;
    field: EditableFieldKey;
    isPassword?: boolean;
  }[] = [
    { label: 'Correo electrónico', field: 'email' },
    { label: 'Contraseña', field: 'password', isPassword: true },
    { label: 'Nombre de usuario', field: 'username' },
    { label: 'Teléfono', field: 'phone' },
    { label: 'Dirección', field: 'address' },
  ];

  return (
    <ScrollView
      style={[styles.containerUser, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContentUser}
    >
      <View style={styles.profileSectionUser}>
        <View style={styles.profileImageContainerUser}>
          <Image
            source={{ uri: editableUser.profilePhoto || 'https://via.placeholder.com/150' }}
            style={[styles.profileImageUser, { borderColor: theme.primary }]}
          />
          <TouchableOpacity
            style={[styles.editPhotoButtonUser, { backgroundColor: theme.primary, borderColor: theme.background }]}
            onPress={() => Alert.alert('Editar foto', 'Funcionalidad en desarrollo')}
          >
            <Icon name="camera" size={16} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.nameUser, { color: theme.primary }]}>{editableUser.username}</Text>
      </View>

      <View style={[styles.cardUser, { backgroundColor: theme.surface }]}>
        {fields.map((item, idx) => (
          <View key={item.field}>
            <EditableField
              label={item.label}
              field={item.field}
              value={editableUser[item.field] || ''}
              isPassword={item.isPassword || false}
              isEditing={editingField === item.field}
              onChange={(val) => handleChange(item.field, val)}
              onStartEdit={() => setEditingField(item.field)}
              onEndEdit={handleFinishEditing}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              themedStyles={themedStyles}
            />
            {idx < fields.length - 1 && <View style={[styles.dividerUser, { backgroundColor: theme.primary }]} />}
          </View>
        ))}
      </View>

      {user.status === "admin" && (
        <TouchableOpacity
          style={[styles.adminButton, { backgroundColor: theme.primary }]}
          onPress={() => setShowProductsModal(true)}
        >
          <Text style={[styles.adminButtonText, { color: theme.textPrimary }]}>Administrar productos</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={[styles.logoutButtonUser, { backgroundColor: theme.primary }]} onPress={logout}>
        <Text style={[styles.logoutTextUser, { color: theme.textPrimary }]}>Cerrar sesión</Text>
        <Icon name="sign-out" size={18} style={[styles.logoutIconUser, { color: theme.textPrimary }]} />
      </TouchableOpacity>

      {showProductsModal && (
        <ManageProducts isVisible={true} onClose={() => setShowProductsModal(false)} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerUser: {
    flex: 1,
  },
  scrollContentUser: {
    paddingBottom: 180,
  },
  profileSectionUser: {
    alignItems: 'center',
    marginVertical: 24,
    marginBottom: 16,
  },
  profileImageContainerUser: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImageUser: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
  },
  editPhotoButtonUser: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  nameUser: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardUser: {
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoSectionUser: {
    paddingVertical: 12,
  },
  fieldContainerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  valueContainerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inputUser: {
    fontSize: 16,
    fontWeight: '500',
    borderBottomWidth: 1,
    paddingVertical: 6,
    flex: 1,
  },
  iconsContainerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  iconButtonUser: {
    padding: 6,
    marginLeft: 4,
  },
  dividerUser: {
    height: 1,
    marginVertical: 4,
  },
  logoutButtonUser: {
    padding: 14,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 8,
  },
  logoutTextUser: {
    fontWeight: '600',
    fontSize: 16,
  },
  logoutIconUser: {
    marginLeft: 10,
  },
  centeredUser: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  messageUser: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  loginButtonUser: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  loginButtonTextUser: {
    fontWeight: '600',
    fontSize: 16,
  },
  adminButton: {
    padding: 14,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 8,
  },
  adminButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
