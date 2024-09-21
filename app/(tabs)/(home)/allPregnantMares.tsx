import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import * as Progress from "react-native-progress"; // Import correcto
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { mares } from "./mares";

// Definir el tipo para los datos de las yeguas
type Mare = {
  name: string;
  totalDays: number;
  currentDays: number;
};

export default function AllPregnantMares() {
  const renderItem = (item: Mare) => {
    const remainingDays = item.totalDays - item.currentDays;
    const progress = item.currentDays / item.totalDays;

    return (
      <ThemedView style={styles.itemContainer} key={item.name}>
        <View style={styles.header}>
          <ThemedText style={styles.name}>{item.name}</ThemedText>
        </View>

        {/* Contenedor para superponer el texto sobre la barra de progreso */}
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={progress}
            width={null}
            color="green"
            borderRadius={5}
            height={25}
            unfilledColor="#a9dfbf"
            style={styles.progressBar}
          />
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
    <ScrollView style={styles.container}>{mares.map(renderItem)}</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 10,
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
