import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = initializeAuth(app);

export { app, auth };
