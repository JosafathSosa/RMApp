import react, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { AllHorsesComponent } from "@/components/horses/allHorses/AllHorsesComponent";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useRouter } from "expo-router";

export default function HorsesScreen() {
  const router = useRouter();
  const [pressed, setPressed] = useState(false);

  return (
    <View style={styles.container}>
      <AllHorsesComponent />
      {/* Botón para agregar un nuevo caballo */}

      <Pressable
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={() => router.push("/addHorseScreen")}
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
  container: {
    flex: 1,
  },
  AddHorseDetailButton: {
    position: "absolute", // Fijo en la pantalla
    bottom: 20, // A cierta distancia de la parte inferior
    right: 20, // Alineado a la derecha
    zIndex: 1, // Aseguramos que esté por encima del contenido
  },
});
