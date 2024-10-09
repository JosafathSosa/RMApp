// (horses)/info/horseInfoScreen.tsx
import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { horses } from "../horses";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ThemedView } from "@/components/ThemedView";

// Cambia exportación con nombre a exportación por defecto
export default function HorseInfoScreen({}) {
  const { id } = useLocalSearchParams();
  const horseId = parseInt(id as string);
  const horse = horses[horseId];

  return (
    <KeyboardAwareScrollView>
      <ThemedView style={styles.container}>
        <View>
          <View style={styles.horseName}>
            <ThemedText style={styles.nameStyle}>Datos de</ThemedText>
            {horse.gender === "female" ? (
              <ThemedText style={styles.nameStyle}> la yegua</ThemedText>
            ) : (
              <ThemedText style={styles.nameStyle}> el caballo</ThemedText>
            )}
          </View>
          <View style={styles.dataStyle}>
            <ThemedText>Nombre: {horse.name}</ThemedText>
            <ThemedText>ID: {horse.id}</ThemedText>
            <ThemedText>Fecha de nacimiento: {horse.bornDate}</ThemedText>
            <ThemedText>Raza: {horse.race}</ThemedText>
            <ThemedText>Pelo: {horse.hair}</ThemedText>
            <ThemedText>Microchip: {horse.microchip}</ThemedText>
            <ThemedText>Pasaporte: {horse.passport}</ThemedText>
            <ThemedText>Ubicacion: {horse.location}</ThemedText>
            <ThemedText>Categoria: {horse.category}</ThemedText>
            <ThemedText>Peso: {horse.weight} Kg</ThemedText>
          </View>
        </View>
      </ThemedView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  horseName: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  nameStyle: {
    fontSize: 20,
    fontWeight: "600",
  },
  dataStyle: {
    marginLeft: 10,
    gap: 10,
  },
});
