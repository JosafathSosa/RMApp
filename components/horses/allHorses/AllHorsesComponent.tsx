import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router"; // Importa useRouter

type Horse = {
  id: number;
  name: string;
  birthDate: string;
  microchip: number;
};

// Ejemplo de datos de caballos
const horses: Horse[] = [
  {
    id: 6002326,
    name: "Amy Down Ryon (Panzona)",
    birthDate: "5A 6M 2D",
    microchip: 933000320656141,
  },
  {
    id: 933000123456789,
    name: "Bastet",
    birthDate: "5A 1M 1D",
    microchip: 933000123456789,
  },
  {
    id: 23456789,
    name: "Luna",
    birthDate: "1A 4M 20D",
    microchip: 933000123456789,
  },
  {
    id: 6789,
    name: "Boxeador",
    birthDate: "2A 7M 20D",
    microchip: 933000123456789,
  },
  {
    id: 456789,
    name: "Canelo",
    birthDate: "7A 2M 12D",
    microchip: 933000123,
  },
  // Agrega más caballos aquí
];

export const AllHorsesComponent = () => {
  const router = useRouter(); // Obtiene el router
  // Aseguramos el tipo de 'item' usando la interfaz Horse
  const renderItem = ({ item }: { item: Horse }) => (
    <TouchableOpacity
      onPress={() => {
        // Navega a HorseDetailsScreen y pasa el caballo como parámetro
        router.push({
          pathname: "/horseDetailsScreen",
          params: { id: item.id },
        });
      }}
    >
      <ThemedView style={styles.card}>
        <Image
          source={{
            uri: "https://www.fullbuckethealth.com/cdn/shop/articles/FullBucket_Horse_Age_Chart_800x.jpg?v=1597367323",
          }} // Imagen estática de prueba
          style={styles.image}
        />
        <View style={styles.info}>
          <ThemedText style={styles.name}>{item.name}</ThemedText>
          <ThemedText style={styles.desc}>ID: {item.id}</ThemedText>
          <ThemedText style={styles.desc}>
            Fecha de nacimiento: {item.birthDate}
          </ThemedText>
          <ThemedText style={styles.desc}>
            Microchip: {item.microchip}
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, marginTop: 10, marginHorizontal: 10 }}>
      <FlatList
        data={horses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row", // Para alinear la imagen al lado de los datos
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc", // Añade color de fondo para verificar espacio
    marginRight: 15,
  },
  info: {
    flex: 1, // Toma el espacio restante para los textos
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  desc: {
    fontSize: 14,
  },
});
