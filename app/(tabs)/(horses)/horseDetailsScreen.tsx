import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Pressable,
  TouchableOpacity,
  Text,
} from "react-native";
import { Button, Divider } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import * as Progress from "react-native-progress";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Horse, horses } from "./horses";
import { PedigreeComponent } from "@/components/horses/pedigreeComponent/PedigreeComponent";

// Definir el tipo de Movimiento
type Movimiento = {
  id: string;
  tipo: string;
  detalle: string;
  fecha: string;
  proxima: string;
};

export default function HorseDetailsScreen() {
  const { id } = useLocalSearchParams();
  const horseId = parseInt(id as string);
  const horse = horses[horseId];

  // Estado para manejar el historial dinámico, ahora con el tipo Movimiento
  const [movimientos, setMovimientos] = useState<Movimiento[]>([
    {
      id: "1",
      tipo: "Vacunación",
      detalle: "Tétanos",
      fecha: "18 jun 2024",
      proxima: "Próx. 24 jun 2024",
    },
    {
      id: "2",
      tipo: "Control reproductivo",
      detalle: "Preñada - Dx 3 meses",
      fecha: "24 jun 2024",
      proxima: "Próx. 02 jul 2024",
    },
  ]);

  const [pressed, setPressed] = useState(false);

  if (!horse) {
    return (
      <View style={styles.notFoundContainer}>
        <ThemedText>Caballo no encontrado</ThemedText>
      </View>
    );
  }

  const remainingDays = horse.gestationDays - horse.currentDays;
  const progress = horse.currentDays / horse.gestationDays;

  // Función para agregar un nuevo movimiento
  const agregarMovimiento = () => {
    const nuevoMovimiento: Movimiento = {
      id: (movimientos.length + 1).toString(),
      tipo: "Nuevo control",
      detalle: "Detalles adicionales...",
      fecha: "Fecha",
      proxima: "Próxima fecha",
    };
    setMovimientos([...movimientos, nuevoMovimiento]);
  };

  // Función para eliminar un movimiento
  const eliminarMovimiento = (id: string) => {
    setMovimientos(movimientos.filter((movimiento) => movimiento.id !== id));
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        {/* Información del Caballo */}
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

        {/* Progreso de gestación */}
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
                unfilledColor="#a9dfbf"
                style={styles.progressBar}
              />
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
        ) : null}

        {/* Árbol genealógico */}
        <PedigreeComponent horse={horse} />

        {/* Historial de movimientos */}

        <ThemedText style={styles.sectionTitle}>
          Historial de Movimientos
        </ThemedText>
        {movimientos.map((item) => (
          <ThemedView key={item.id} style={styles.card}>
            <View style={styles.dateIconsContainer}>
              <ThemedText style={styles.fecha}>{item.fecha}</ThemedText>
              <View style={styles.iconos}>
                <TouchableOpacity
                  onPress={() => console.log("Editar movimiento")}
                >
                  <Ionicons name="pencil" size={24} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => eliminarMovimiento(item.id)}>
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>

            <ThemedText style={styles.tipo}>{item.tipo}</ThemedText>
            <ThemedText>{item.detalle}</ThemedText>
            <ThemedText>{item.proxima}</ThemedText>
          </ThemedView>
        ))}
      </KeyboardAwareScrollView>

      {/* Botón para agregar nuevo movimiento, fuera del ScrollView */}
      <Pressable
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={() => console.log("Hola")}
        style={({ pressed }) => [
          styles.AddHorseDetailButton,
          { transform: [{ scale: pressed ? 0.9 : 1 }] },
        ]}
      >
        <AntDesign name="pluscircle" size={45} color="green" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1, // Aseguramos que el contenedor ocupe toda la pantalla
    marginHorizontal: 10,
    borderRadius: 20,
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: "#ccc",
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
  AddHorseDetailButton: {
    position: "absolute", // Fijo en la pantalla
    bottom: 20, // A cierta distancia de la parte inferior
    right: 20, // Alineado a la derecha
    zIndex: 1, // Aseguramos que esté por encima del contenido
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 4,
  },
  dateIconsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fecha: {
    color: "#6c757d",
    fontSize: 12,
  },
  tipo: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  iconos: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    marginTop: 10,
    color: "green",
  },
});
