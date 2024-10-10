import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  browserLocalPersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDvphhxIEygxhiiAqZy9AdPxLenaJCntkM",
  authDomain: "ranchomezquiteapp.firebaseapp.com",
  projectId: "ranchomezquiteapp",
  storageBucket: "ranchomezquiteapp.appspot.com",
  messagingSenderId: "791017570396",
  appId: "1:791017570396:web:dd6e73f2b872dfde5c2699",
  measurementId: "G-TEKQ3N8KTZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth con la persistencia adecuada dependiendo de la plataforma
let auth;

if (Platform.OS === "web") {
  // Para web, utiliza la persistencia del navegador
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence); // Persistencia en navegador
} else {
  // Para React Native, usa AsyncStorage como persistencia
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage), // Persistencia para React Native
  });
}
export { auth };
