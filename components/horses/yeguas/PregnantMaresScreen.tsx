import React from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import * as Progress from "react-native-progress"; // Import correcto
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// Definir el tipo para los datos de las yeguas
type Mare = {
  name: string;
  totalDays: number;
  currentDays: number;
};

const mares: Mare[] = [
  { name: "New Moon", totalDays: 340, currentDays: 320 },
  { name: "Luna de Plata", totalDays: 340, currentDays: 268 },
  { name: "Foreverteen", totalDays: 340, currentDays: 208 },
  { name: "Magna Forestry", totalDays: 340, currentDays: 197 },
];

export function PregnantMaresScreen() {
  const renderItem = (item: Mare) => {
    const remainingDays = item.totalDays - item.currentDays;
    const progress = item.currentDays / item.totalDays;

    return (
      <ThemedView style={styles.itemContainer} key={item.name}>
        <View style={styles.header}>
          <ThemedText style={styles.name}>{item.name}</ThemedText>
          <Button title="i" onPress={() => {}} />
        </View>

        {/* Contenedor para superponer el texto sobre la barra de progreso */}
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={progress}
            width={null}
            color="green"
            borderRadius={5}
            height={25}
            unfilledColor="#a9dfbf" // Color de la parte no llenada
            style={styles.progressBar}
          />
          {/* Superponiendo el texto dentro de la barra */}
          <View style={styles.progressTextContainer}>
            <ThemedText style={styles.progressText}>
              {item.currentDays} días de gestación
            </ThemedText>
            <ThemedText style={styles.progressText}>
              {remainingDays} días restantes
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    );
  };

  return (
    <View style={styles.container}>
      <View>{mares.slice(0, 3).map(renderItem)}</View>
      <Button title="Ver Todo" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 310,
  },
  itemContainer: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressContainer: {
    position: "relative",
    marginVertical: 0,
  },
  progressBar: {
    height: 25,
    borderRadius: 5,
    borderWidth: 0,
  },
  progressTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  progressText: {
    color: "#fff",
    fontSize: 15,
  },
});
