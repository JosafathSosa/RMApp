import react from "react";
import { ScrollView, Button, View } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "react-native-paper";

import { PregnantMaresScreen } from "../../../components/horses/yeguas/PregnantMaresScreen";

import { ThemedText } from "@/components/ThemedText";
//import { styles } from "./home.styles";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.mainView}>
      <View>
        <Text variant="headlineSmall">Yeguas preñadas</Text>
      </View>
      <View>
        <PregnantMaresScreen />
      </View>
    </View>
  );
}

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Esto puede afectar el alineado de los elementos
  },
  mainView: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    // Asegúrate de que los elementos se dispongan correctamente:
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});
