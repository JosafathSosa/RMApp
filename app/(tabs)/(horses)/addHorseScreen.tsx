import react from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { AddHorseForm } from "@/components/horses/addHorseForm/AddHorseForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AddHorseScreen() {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <AddHorseForm />
    </KeyboardAwareScrollView>
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
