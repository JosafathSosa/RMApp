import react from "react";
import { StyleSheet, Button, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";

import { useRouter } from "expo-router";

export default function PregnantStatus() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText>Hola yeguas preñadas</ThemedText>
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
