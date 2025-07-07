import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import themeManager from "@/Theme/ThemeManager";
import ToggleSwitch from "@/components/switchTheme";

const SettingsScreen = () => {
  const [mode, setMode] = useState<"light" | "dark">(themeManager.getMode());

  useEffect(() => {
    themeManager.subscribe(setMode);
    return () => {
      themeManager.unsubscribe(setMode);
    };
  }, []);

  const theme = themeManager.getTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.primary }]}>
          Configuración
        </Text>

        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.primary }]}>
              Modo de tema
            </Text>
            <ToggleSwitch />
          </View>
          <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
            Cambia entre modo claro y oscuro según tu preferencia visual.
          </Text>
        </View>

        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: theme.textSecondary }]}>
            Versión 1.1.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 32,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  settingDesc: {
    fontSize: 14,
    marginTop: 8,
  },
  versionContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  versionText: {
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default SettingsScreen;
