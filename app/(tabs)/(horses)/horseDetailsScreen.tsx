import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLocalSearchParams } from "expo-router";

export default function HorseDetailsScreen() {
  // Usamos useSearchParams para acceder a los parámetros de la ruta
  const { id } = useLocalSearchParams();

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <ThemedText>Hola</ThemedText>
      <ThemedText>ID del caballo: {id}</ThemedText>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});
