// (horses)/info/horseInfoScreen.tsx
import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { horses } from "../horses";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Cambia exportación con nombre a exportación por defecto
export default function HorseInfoScreen({}) {
  const { id } = useLocalSearchParams();
  const horseId = parseInt(id as string);
  const horse = horses[horseId];

  return (
    <View>
      <KeyboardAwareScrollView>
        <View style={styles.horseName}>
          <ThemedText>Datos de</ThemedText>
          {horse.gender === "female" ? (
            <ThemedText> la yegua</ThemedText>
          ) : (
            <ThemedText> el caballo</ThemedText>
          )}
        </View>
        <View>
          <ThemedText>ID: {horse.id}</ThemedText>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  horseName: {
    display: "flex",
    flexDirection: "row",
  },
});
