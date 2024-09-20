import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// Define el tipo para cada categoría
type Location = {
  id: number;
  name: string;
  count: number;
};

// Define el tipo de las props del componente
type HorseCategoryCountProps = {
  categories: Location[];
};

export const HorseCategoryCount: React.FC<HorseCategoryCountProps> = ({
  categories,
}) => {
  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {categories.slice(0, 3).map((item) => (
          <View style={styles.categoryContainer} key={item.id}>
            <ThemedText style={styles.category}>{item.name}</ThemedText>
            <ThemedText style={styles.count}>{item.count}</ThemedText>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    marginVertical: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  category: {
    fontSize: 16,
  },
  count: {
    fontSize: 16,
    color: "#008000", // Color similar al número en verde
  },
});
