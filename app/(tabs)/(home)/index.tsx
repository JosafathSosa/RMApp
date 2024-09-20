import React from "react";
import { ScrollView, Button, View } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "react-native-paper";

import { PregnantMaresScreen } from "../../../components/horses/yeguas/PregnantMaresScreen";
import { HorseCategoryCount } from "../../../components/horses/horsesCategories/HorseCategoryCount";
import { HorseCategoryChart } from "../../../components/horses/horsesCategoryChart/HorseCategoryChart";

import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  const router = useRouter();

  const horseLocations = [
    { id: 1, name: "Sin ubicación", count: 20 },
    { id: 2, name: "Rancho El Mezquite", count: 42 },
    { id: 3, name: "Tongolele", count: 1 },
  ];

  const horseCategories = [
    { id: 1, name: "Recría", count: 53, color: "#4B7BEC" },
    { id: 2, name: "Destete", count: 18, color: "#FF3B30" },
    { id: 3, name: "Sementales", count: 8, color: "#FF9500" },
    { id: 4, name: "Manada", count: 7, color: "#34C759" },
    { id: 5, name: "Cuida", count: 5, color: "#AF52DE" },
    { id: 6, name: "Trabajo", count: 3, color: "#5856D6" },
    { id: 7, name: "Donantes", count: 2, color: "#FF2D55" },
    { id: 8, name: "Otras", count: 1, color: "#FFCC00" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.mainView}>
      <View>
        <Text style={styles.mares} variant="headlineSmall">
          Yeguas preñadas
        </Text>
      </View>
      <View>
        <PregnantMaresScreen />
      </View>
      <View>
        <Text style={styles.mares} variant="headlineSmall">
          Caballos por ubicación
        </Text>
        <HorseCategoryCount categories={horseLocations} />
      </View>
      <View>
        <Text style={styles.mares} variant="headlineSmall">
          Caballos por categoria
        </Text>
        <HorseCategoryChart categories={horseCategories} />
      </View>
    </ScrollView>
  );
}

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  mainView: {
    flexGrow: 1,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  mares: {
    marginLeft: 10,
  },
});
