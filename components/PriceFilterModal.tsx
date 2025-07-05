import React from "react";
import {
  Modal,
  View,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import { styles } from "../Styles/globalStyles";

type Props = {
  visible: boolean;
  onClose: () => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
};

export default function PriceFilterModal({
  visible,
  onClose,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlayGalery}>
        <View style={styles.modalContainerGalery}>
          <View style={styles.modalHeaderGalery}>
            <Pressable onPress={onClose} style={styles.closeButtonGalery}>
              <Text style={styles.closeButtonTextGalery}>✕</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.priceFilterContentGalery}>
            <Text style={styles.columnTitleGalery}>Filtrar por precio</Text>

            <Text style={styles.priceLabelGalery}>Precio mínimo:</Text>
            <TextInput
              style={styles.inputGalery}
              keyboardType="numeric"
              placeholder="Ej. 10"
              value={minPrice}
              onChangeText={setMinPrice}
            />

            <Text style={styles.priceLabelGalery}>Precio máximo:</Text>
            <TextInput
              style={styles.inputGalery}
              keyboardType="numeric"
              placeholder="Ej. 100"
              value={maxPrice}
              onChangeText={setMaxPrice}
            />

            <Pressable onPress={onClose} style={styles.applyButtonGalery}>
              <Text style={styles.applyButtonTextGalery}>Aplicar</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setMinPrice("");
                setMaxPrice("");
                onClose();
              }}
            >
              <Text style={styles.clearFiltersGalery}>Limpiar filtros</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
