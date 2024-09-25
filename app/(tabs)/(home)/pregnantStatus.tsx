import React from "react";
import { StyleSheet, ScrollView, View, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";

interface MareDetailsProps {
  mareId: string;
}

export default function PregnantStatus() {
  // Capturar el parámetro `id` desde la URL
  const { id } = useLocalSearchParams();

  // Aquí es donde obtendrías los datos del backend usando el `id` (Firebase, API, etc.)
  const mareData = {
    name: "Luna de Plata",
    father: "LARRY",
    serviceType: "Monta directa",
    serviceDate: "16/12/2023",
    confirmationDate: "24/06/2024",
    gestationDays: 279,
    estimatedPartDate: "20/11/2024",
    remainingDays: 61,
    status: "Preñada",
    comments: "",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.centeredContent}>
            <ThemedText style={styles.header}>
              {mareData.name} {id}
            </ThemedText>
            <ThemedText style={styles.status}>{mareData.status}</ThemedText>
          </View>
          <Button
            title="Registrar Nacimiento"
            onPress={() => {
              // Acción para registrar nacimiento
            }}
            color="green"
          />
        </View>

        <View style={styles.detailContainer}>
          <ThemedText style={styles.label}>Padre:</ThemedText>
          <ThemedText style={styles.value}>{mareData.father}</ThemedText>
        </View>

        <View style={styles.detailContainer}>
          <ThemedText style={styles.label}>Tipo de servicio:</ThemedText>
          <ThemedText style={styles.value}>{mareData.serviceType}</ThemedText>
        </View>

        <View style={styles.detailContainer}>
          <ThemedText style={styles.label}>Fecha de servicio:</ThemedText>
          <ThemedText style={styles.value}>{mareData.serviceDate}</ThemedText>
        </View>

        <View style={styles.detailContainer}>
          <ThemedText style={styles.label}>Fecha de confirmación:</ThemedText>
          <ThemedText style={styles.value}>
            {mareData.confirmationDate}
          </ThemedText>
        </View>

        <View style={styles.detailContainer}>
          <ThemedText style={styles.label}>Días de gestación:</ThemedText>
          <ThemedText style={styles.value}>{mareData.gestationDays}</ThemedText>
        </View>

        <View style={styles.detailContainer}>
          <ThemedText style={styles.label}>Fecha estimada de parto:</ThemedText>
          <ThemedText style={styles.value}>
            {mareData.estimatedPartDate}
          </ThemedText>
        </View>

        <View style={styles.detailContainer}>
          <ThemedText style={styles.label}>Días restantes:</ThemedText>
          <ThemedText style={styles.value}>{mareData.remainingDays}</ThemedText>
        </View>

        <View style={styles.detailContainer}>
          <ThemedText style={styles.label}>Comentarios:</ThemedText>
          <ThemedText style={styles.value}>{mareData.comments}</ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  centeredContent: {
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
  value: {
    color: "#777",

    fontSize: 16,
  },
});
