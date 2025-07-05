import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { Product, products } from "../../database/products";
import themeManager from "@/Theme/ThemeManager";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ManageProducts({ isVisible, onClose }: { isVisible: boolean; onClose: () => void; }) {
  const [theme, setTheme] = useState(themeManager.getTheme());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isAdding, setIsAdding] = useState(false);
  const [allCategories, setAllCategories] = useState<{ [key: string]: Set<string> }>({});
  const [primaryCategory, setPrimaryCategory] = useState<string>("");
  const [secondaryCategory, setSecondaryCategory] = useState<string>("");

  useEffect(() => {
    const handleThemeChange = () => setTheme(themeManager.getTheme());
    themeManager.subscribe(handleThemeChange);
    return () => themeManager.unsubscribe(handleThemeChange);
  }, []);

  useEffect(() => {
    const filtered = products.filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredProducts(filtered);
  }, [searchText]);

  useEffect(() => {
    const categories: { [key: string]: Set<string> } = {};
    products.forEach((p) => {
      const [main, sub] = p.categories;
      if (main && sub) {
        if (!categories[main]) categories[main] = new Set();
        categories[main].add(sub);
      }
    });
    setAllCategories(categories);
  }, [products]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditedProduct({ ...product });
    setPrimaryCategory(product.categories[0] || "");
    setSecondaryCategory(product.categories[1] || "");
    setIsAdding(false);
  };

  const handleEditChange = (field: keyof Product, value: string) => {
    if (!editedProduct) return;
    const updated = { ...editedProduct };
    if (field === "price" || field === "stock") {
      updated[field] = parseFloat(value) || 0;
    } else if (field === "categories") {
      updated[field] = Array.isArray(value) ? value : [value];
    } else {
      updated[field] = value;
    }
    setEditedProduct(updated);
  };

  const handleSave = () => {
    if (!editedProduct) return;
    editedProduct.categories = [primaryCategory, secondaryCategory];

    if (isAdding) {
      products.push(editedProduct);
      Alert.alert("Éxito", "Producto agregado correctamente.");
    } else {
      const index = products.findIndex((p) => p.name === editedProduct.name);
      if (index !== -1) {
        products[index] = { ...editedProduct };
        Alert.alert("Éxito", "Producto actualizado correctamente.");
      }
    }
    setSelectedProduct(null);
    setIsAdding(false);
  };

  const handleDeleteProduct = (product: Product) => {
    Alert.alert("Confirmar eliminación", "¿Estás seguro de eliminar este producto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          const index = products.findIndex((p) => p.name === product.name);
          if (index !== -1) {
            products.splice(index, 1);
            setFilteredProducts([...products]);
            Alert.alert("Eliminado", "Producto eliminado correctamente.");
          }
        },
      },
    ]);
  };

  const handleAddProduct = () => {
    setIsAdding(true);
    setEditedProduct({ name: "", price: 0, imageUrl: "", categories: ["", ""], description: "", stock: 0 });
    setPrimaryCategory("");
    setSecondaryCategory("");
    setSelectedProduct({} as Product);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={[styles.productCard, { backgroundColor: theme.surface }]}> 
      <TouchableOpacity style={{ flexDirection: "row", flex: 1 }} onPress={() => handleSelectProduct(item)}>
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={[styles.productName, { color: theme.secondary }]}>{item.name}</Text>
          <Text style={{ color: theme.textSecondary }}>Precio: ${item.price}</Text>
          <Text style={{ color: theme.textSecondary }}>Stock: {item.stock}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteProduct(item)} style={styles.deleteIcon}>
        <Icon name="trash" size={20} color={theme.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={{ margin: 0 }}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.primary }]}>Administrar Productos</Text>

        <TextInput
          style={[styles.searchInput, { borderColor: theme.primary, color: theme.secondary }]}
          placeholder="Buscar producto..."
          placeholderTextColor={theme.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
        />

        <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.primary }]} onPress={handleAddProduct}>
          <Text style={[styles.addButtonText, { color: theme.textPrimary }]}>Agregar Producto</Text>
        </TouchableOpacity>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />

        <TouchableOpacity style={[styles.closeButton, { backgroundColor: theme.primary }]} onPress={onClose}>
          <Text style={[styles.closeButtonText, { color: theme.textPrimary }]}>Cerrar</Text>
        </TouchableOpacity>

        <Modal isVisible={!!selectedProduct} onBackdropPress={() => setSelectedProduct(null)}>
          <ScrollView style={[styles.editContainer, { backgroundColor: theme.surface }]}>
            <Text style={[styles.title, { color: theme.primary }]}>{isAdding ? "Nuevo Producto" : "Editar Producto"}</Text>
            {editedProduct && (
              <>
                <Text style={[styles.label, { color: theme.textSecondary }]}>Nombre</Text>
                <TextInput style={[styles.input, { borderColor: theme.primary, color: theme.secondary }]} value={editedProduct.name} onChangeText={(text) => handleEditChange("name", text)} />

                <Text style={[styles.label, { color: theme.textSecondary }]}>Precio</Text>
                <TextInput style={[styles.input, { borderColor: theme.primary, color: theme.secondary }]} keyboardType="numeric" value={String(editedProduct.price)} onChangeText={(text) => handleEditChange("price", text)} />

                <Text style={[styles.label, { color: theme.textSecondary }]}>Stock</Text>
                <TextInput style={[styles.input, { borderColor: theme.primary, color: theme.secondary }]} keyboardType="numeric" value={String(editedProduct.stock)} onChangeText={(text) => handleEditChange("stock", text)} />

                <Text style={[styles.label, { color: theme.textSecondary }]}>URL Imagen</Text>
                <TextInput style={[styles.input, { borderColor: theme.primary, color: theme.secondary }]} value={editedProduct.imageUrl} onChangeText={(text) => handleEditChange("imageUrl", text)} />

                <Text style={[styles.label, { color: theme.textSecondary }]}>Categoría Principal</Text>
                <FlatList horizontal data={Object.keys(allCategories)} keyExtractor={(item) => item} renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => setPrimaryCategory(item)} style={{ margin: 4, padding: 6, backgroundColor: primaryCategory === item ? theme.primary : theme.surface, borderRadius: 8 }}>
                    <Text style={{ color: theme.textPrimary }}>{item}</Text>
                  </TouchableOpacity>
                )} />

                {primaryCategory && (
                  <>
                    <Text style={[styles.label, { color: theme.textSecondary }]}>Categoría Secundaria</Text>
                    <FlatList horizontal data={Array.from(allCategories[primaryCategory] || [])} keyExtractor={(item) => item} renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => setSecondaryCategory(item)} style={{ margin: 4, padding: 6, backgroundColor: secondaryCategory === item ? theme.primary : theme.surface, borderRadius: 8 }}>
                        <Text style={{ color: theme.textPrimary }}>{item}</Text>
                      </TouchableOpacity>
                    )} />
                  </>
                )}

                <Text style={[styles.label, { color: theme.textSecondary }]}>Descripción</Text>
                <TextInput style={[styles.inputArea, { borderColor: theme.primary, color: theme.secondary }]} multiline value={editedProduct.description} onChangeText={(text) => handleEditChange("description", text)} />

                <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.primary }]} onPress={handleSave}>
                  <Text style={[styles.saveButtonText, { color: theme.textPrimary }]}>Guardar cambios</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  addButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  deleteIcon: {
    padding: 8,
  },
  closeButton: {
    marginTop: 10,
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
    maxHeight: "95%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 15,
  },
  inputArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
    height: 100,
    textAlignVertical: "top",
  },
  label: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "500",
  },
  saveButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
