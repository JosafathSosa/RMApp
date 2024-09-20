import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// Initialize Auth with AsyncStorage for React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
