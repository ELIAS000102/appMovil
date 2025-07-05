import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { users } from "../../database/users";
import { User, getUser, updateUser } from "../../authentication/authService";
import themeManager from "@/Theme/ThemeManager";

export default function ManageUsers({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const [theme, setTheme] = useState(themeManager.getTheme());
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(themeManager.getTheme());
    };
    themeManager.subscribe(handleThemeChange);
    setAuthUser(getUser());
    return () => themeManager.unsubscribe(handleThemeChange);
  }, []);

  const otherUsers = users.filter((u) => u.email !== authUser?.email);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setEditedUser({ ...user });
  };

  const handleEditChange = (field: keyof User, value: string) => {
    setEditedUser((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = () => {
    if (!editedUser) return;

    const index = users.findIndex((u) => u.email === editedUser.email);
    if (index !== -1) {
      users[index] = {
        ...editedUser,
        password: editedUser.password ?? "",
        phone: editedUser.phone ?? "",
        address: editedUser.address ?? "",
      };
      Alert.alert("Éxito", "Usuario actualizado correctamente.");
      setSelectedUser(null);
    }
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={[styles.userCard, { backgroundColor: theme.surface }]}
      onPress={() => handleSelectUser(item)}
    >
      <Image source={{ uri: item.profilePhoto }} style={styles.avatar} />
      <View>
        <Text style={[styles.username, { color: theme.secondary }]}>
          {item.username}
        </Text>
        <Text style={[styles.status, { color: theme.textSecondary }]}>
          {item.status === "admin" ? "Administrador" : "Usuario"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.primary }]}>
          Usuarios Registrados
        </Text>

        <FlatList
          data={otherUsers}
          keyExtractor={(item) => item.email}
          renderItem={renderUserItem}
          contentContainerStyle={{ paddingBottom: 10 }}
        />

        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: theme.primary }]}
          onPress={onClose}
        >
          <Text style={[styles.closeButtonText, { color: theme.textPrimary }]}>
            Cerrar
          </Text>
        </TouchableOpacity>

        {/* Modal interno para editar usuario */}
        <Modal
          isVisible={!!selectedUser}
          onBackdropPress={() => setSelectedUser(null)}
          style={{ justifyContent: "center" }}
        >
          <View
            style={[styles.editContainer, { backgroundColor: theme.surface }]}
          >
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
              <Text style={[styles.title, { color: theme.primary }]}>
                Editar Usuario
              </Text>

              {editedUser && (
                <>
                  <Image
                    source={{ uri: editedUser.profilePhoto }}
                    style={styles.editAvatar}
                  />

                  <Text style={[styles.label, { color: theme.textSecondary }]}>
                    Nombre de usuario
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { color: theme.secondary, borderColor: theme.primary },
                    ]}
                    value={editedUser.username}
                    onChangeText={(text) => handleEditChange("username", text)}
                  />

                  <Text style={[styles.label, { color: theme.textSecondary }]}>
                    Correo electrónico
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { color: theme.secondary, borderColor: theme.primary },
                    ]}
                    value={editedUser.email}
                    onChangeText={(text) => handleEditChange("email", text)}
                  />

                  <Text style={[styles.label, { color: theme.textSecondary }]}>
                    Teléfono
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { color: theme.secondary, borderColor: theme.primary },
                    ]}
                    value={editedUser.phone || ""}
                    onChangeText={(text) => handleEditChange("phone", text)}
                  />

                  <Text style={[styles.label, { color: theme.textSecondary }]}>
                    Dirección
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { color: theme.secondary, borderColor: theme.primary },
                    ]}
                    value={editedUser.address || ""}
                    onChangeText={(text) => handleEditChange("address", text)}
                  />

                  <Text style={[styles.label, { color: theme.textSecondary }]}>
                    Contraseña
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      { color: theme.secondary, borderColor: theme.primary },
                    ]}
                    secureTextEntry
                    value={editedUser.password || ""}
                    onChangeText={(text) => handleEditChange("password", text)}
                  />

                  <TouchableOpacity
                    style={[
                      styles.saveButton,
                      { backgroundColor: theme.primary, marginTop: 16 },
                    ]}
                    onPress={handleSave}
                  >
                    <Text
                      style={[
                        styles.saveButtonText,
                        { color: theme.textPrimary },
                      ]}
                    >
                      Guardar cambios
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 20,
    maxHeight: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
  },
  status: {
    fontSize: 14,
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  editContainer: {
    borderRadius: 12,
    padding: 20,
  },
  editAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 15,
  },
  saveButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "500",
  },
});
