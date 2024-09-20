import react from "react";
import { StyleSheet, ScrollView, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.replace("/login");
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText>Hola home screen</ThemedText>
      <Button title="Logout" onPress={handleLogout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
