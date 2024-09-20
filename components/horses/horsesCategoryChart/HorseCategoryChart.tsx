import React from "react";
import { PieChart } from "react-native-chart-kit";
import { View, Dimensions, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface Category {
  id: number;
  name: string;
  count: number;
  color: string;
}

interface Props {
  categories: Category[];
}

export const HorseCategoryChart: React.FC<Props> = ({ categories }) => {
  // Obtener el ancho de la pantalla para ajustar el tamaño del gráfico
  const screenWidth = Dimensions.get("window").width;

  // Preparar los datos para el gráfico circular
  const data = categories.map((category) => ({
    name: category.name,
    population: category.count,
    color: category.color,
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
