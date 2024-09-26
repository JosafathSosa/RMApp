import react from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { AllHorsesComponent } from "@/components/horses/allHorses/AllHorsesComponent";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function HorsesScreen() {
  return (
    <View style={styles.container}>
      <AllHorsesComponent />
      {/* Botón para agregar un nuevo caballo */}

      <TouchableOpacity style={styles.fab}>
        <Link href="/addHorseScreen">
          <AntDesign name="pluscircle" size={45} color="green" />
        </Link>
      </TouchableOpacity>
    </View>
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
