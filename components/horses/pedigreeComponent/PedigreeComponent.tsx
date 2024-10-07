import { StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Horse } from "@/app/(tabs)/(horses)/horses";

export const PedigreeComponent = ({ horse }: { horse: Horse }) => {
  return (
    <View>
      <ThemedView style={styles.pedigreeContainer}>
        <ThemedText style={styles.pedigreeTitle}>Pedigree</ThemedText>

        {/* Padres */}
        <View style={styles.parentContainer}>
          <ThemedView style={styles.parentBox1}>
            <ThemedText style={styles.parentTitle}>Padre</ThemedText>
            <ThemedText style={{ color: "black" }}>
              {horse.father?.name || "Desconocido"}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.parentBox}>
            <ThemedText style={styles.parentTitle}>Madre</ThemedText>
            <ThemedText style={{ color: "black" }}>
              {horse.mother?.name || "Desconocido"}
            </ThemedText>
          </ThemedView>
        </View>

        {/* Abuelos */}
        <View style={styles.grandparentContainer}>
          <ThemedView style={styles.parentBox1}>
            <ThemedText style={{ color: "black", textAlign: "center" }}>
              {horse.paternalGrandfather?.name || "Desconocido"}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.parentBox}>
            <ThemedText style={{ color: "black", textAlign: "center" }}>
              {horse.paternalGrandmother?.name || "Desconocido"}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.parentBox1}>
            <ThemedText style={{ color: "black", textAlign: "center" }}>
              {horse.maternalGrandfather?.name || "Desconocido"}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.parentBox}>
            <ThemedText style={{ color: "black", textAlign: "center" }}>
              {horse.maternalGrandmother?.name || "Desconocido"}
            </ThemedText>
          </ThemedView>
        </View>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  pedigreeContainer: {
    paddingVertical: 20,
  },
  pedigreeTitle: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: "green",
  },
  parentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  parentBox1: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
    backgroundColor: "#85c1e9",
    borderColor: "#3498db",
    borderWidth: 1,
  },
  parentBox: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
    backgroundColor: "#d7bde2",
    borderColor: "#af7ac5",
    borderWidth: 1,
  },
  parentTitle: {
    fontWeight: "600",
    color: "black",
  },
  grandparentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },
  grandparentBox: {
    width: "48%",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
});
