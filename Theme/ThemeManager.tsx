// src/Theme/ThemeManager.ts
import { lightTheme, darkTheme } from "./colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode = "light" | "dark";
type Listener = (mode: ThemeMode) => void;

class ThemeManager {
  private mode: ThemeMode = "light";
  private listeners: Listener[] = [];

  async init() {
    const savedMode = await AsyncStorage.getItem("appTheme");
    if (savedMode === "dark" || savedMode === "light") {
      this.mode = savedMode;
    }
  }

  getMode(): ThemeMode {
    return this.mode;
  }

  getTheme() {
    return this.mode === "dark" ? darkTheme : lightTheme;
  }

  async toggleTheme() {
    this.mode = this.mode === "light" ? "dark" : "light";
    await AsyncStorage.setItem("appTheme", this.mode);
    this.notifyListeners();
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private notifyListeners() {
    this.listeners.forEach((l) => l(this.mode));
  }
}

const themeManager = new ThemeManager();
export default themeManager;
