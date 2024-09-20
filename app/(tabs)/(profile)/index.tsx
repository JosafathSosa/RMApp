import react from "react";
import { StyleSheet, Button, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { auth } from "../../../utils/firebase";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";

export default function ProfileScreen() {
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
