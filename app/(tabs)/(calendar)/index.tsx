import react from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function CalendarScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText>Hola calendar screen</ThemedText>
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
