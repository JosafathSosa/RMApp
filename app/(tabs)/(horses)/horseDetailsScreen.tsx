import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { Button, Divider } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import * as Progress from "react-native-progress"; // Import correcto
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Horse, horses } from "./horses";
import { PedigreeComponent } from "@/components/horses/pedigreeComponent/PedigreeComponent";

export default function HorseDetailsScreen() {
  // Usamos useSearchParams para acceder a los parámetros de la ruta
  const { id } = useLocalSearchParams();
  const horseId = parseInt(id as string);
  const horse = horses[horseId];

  if (!horse) {
    return (
      <View style={styles.notFoundContainer}>
        <ThemedText>Caballo no encontrado</ThemedText>
      </View>
    );
  }

  const remainingDays = horse.gestationDays - horse.currentDays;
  const progress = horse.currentDays / horse.gestationDays;

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.horseNameContainer}>
        {horse.gender === "female" ? (
          <FontAwesome name="venus" size={25} color="pink" />
        ) : (
          <FontAwesome name="mars" size={25} color="blue" />
        )}

        <ThemedText style={styles.name}>{horse.name}</ThemedText>
      </View>

      <ThemedView style={styles.horseInfoContainer}>
        <Image source={{ uri: horse.imageUrl }} style={styles.image} />
        <View style={styles.horseInfo}>
          <ThemedText>{horse.id}</ThemedText>
          <ThemedText>{horse.birthDate}</ThemedText>
          <ThemedText>{horse.microchip}</ThemedText>
          <Button
            style={{ marginVertical: 10 }}
            textColor="white"
            buttonColor="green"
            onPress={() => console.log("Ver info del caballo")}
          >
            Info del caballo
          </Button>
        </View>
      </ThemedView>
      <Divider />
      {horse.isPregnant && horse.gender === "female" ? (
        <ThemedView style={styles.gestacionContainer}>
          <View>
            <ThemedText style={styles.mareStatus}>Preñada</ThemedText>
          </View>
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
                {horse.currentDays} días de gestación
              </ThemedText>
              <ThemedText style={styles.progressText}>
                {remainingDays} días restantes
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      ) : (
        <></>
      )}
      {/*Arbol genealogico*/}
      <PedigreeComponent horse={horse} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  horseNameContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    flexDirection: "row",
    gap: 15,
  },
  name: {
    fontWeight: "500",
    fontSize: 22,
  },
  horseInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  horseInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor: "#ccc", // Añade color de fondo para verificar espacio
    marginRight: 15,
  },
  gestacionContainer: {
    padding: 20,
  },
  mareStatus: {
    fontWeight: "500",
    padding: 5,
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
