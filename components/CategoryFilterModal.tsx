// File: shopApp/components/CategoryFilterModal.tsx
import React from "react";
import {
  Modal,
  View,
  Pressable,
  ScrollView,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { styles } from "../Styles/globalStyles";
import { lightTheme, darkTheme } from "../Theme/colors";

type Props = {
  visible: boolean;
  onClose: () => void;
  allMainCategories: string[];
  selectedMainCategory: string | null;
  setSelectedMainCategory: (cat: string | null) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (sub: string | null) => void;
  subCategories: string[];
};

export default function CategoryFilterModal({
  visible,
  onClose,
  allMainCategories,
  selectedMainCategory,
  setSelectedMainCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  subCategories,
}: Props) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? darkTheme : lightTheme;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlayGalery}>
        <View style={styles.modalContainerGalery}>
          <View style={styles.modalHeaderGalery}>
            <Pressable onPress={onClose} style={styles.closeButtonGalery}>
              <Text style={styles.closeButtonTextGalery}>✕</Text>
            </Pressable>
          </View>
          <ScrollView>
            <View style={styles.modalContentGalery}>
              <View style={styles.categoryColumnGalery}>
                <Text style={styles.columnTitleGalery}>Categorías principales</Text>
                {allMainCategories.map((main) => (
                  <Pressable
                    key={main}
                    onPress={() => {
                      setSelectedMainCategory(main);
                      setSelectedSubCategory(null);
                    }}
                    style={[
                      styles.categoryItemGalery,
                      selectedMainCategory === main && styles.selectedItemGalery,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryTextGalery,
                        selectedMainCategory === main && styles.selectedTextGalery,
                      ]}
                    >
                      {main}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.categoryColumnGalery}>
                <Text style={styles.columnTitleGalery}>Subcategorías</Text>
                {subCategories.length > 0 ? (
                  subCategories.map((sub) => (
                    <Pressable
                      key={sub}
                      onPress={() => {
                        setSelectedSubCategory(sub);
                        onClose();
                      }}
                      style={[
                        styles.categoryItemGalery,
                        selectedSubCategory === sub && styles.selectedItemGalery,
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryTextGalery,
                          selectedSubCategory === sub && styles.selectedTextGalery,
                        ]}
                      >
                        {sub}
                      </Text>
                    </Pressable>
                  ))
                ) : (
                  <Text style={styles.noSubTextGalery}>
                    Selecciona una categoría principal
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>

          <Pressable
            onPress={() => {
              setSelectedMainCategory(null);
              setSelectedSubCategory(null);
              onClose();
            }}
          >
            <Text style={styles.clearFiltersGalery}>Limpiar filtros</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

