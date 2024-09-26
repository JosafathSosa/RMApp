import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TextInput, Button, Chip, IconButton } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export const AddHorseForm = () => {
  const [sex, setSex] = useState("Macho");
  const [state, setState] = useState("Activo");

  const [reproductiveStatus, setReproductiveStatus] = useState("Reproductor");

  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState(false);

  // Cambia el tipo de "_event" a "DateTimePickerEvent"
  const onChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Mantener abierto en iOS hasta confirmar
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow((value) => !value);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Sección de las imágenes */}
      <ThemedText style={styles.title}>Agrega imagenes:</ThemedText>
      <View style={styles.imageSection}>
        {[...Array(4)].map((_, index) => (
          <IconButton
            key={index}
            icon="camera"
            size={30}
            onPress={() => console.log("Agregar imagen")}
            style={styles.imageButton}
          />
        ))}
      </View>

      {/* Nombre */}
      <TextInput label="Nombre" mode="outlined" style={styles.input} />

      {/* Fecha de nacimiento */}

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange} // Usa la función onChange corregida
        />
      )}
      <TextInput
        label="Fecha de nacimiento"
        value={date.toLocaleDateString()} // Mostrar la fecha seleccionada
        mode="outlined"
        right={<TextInput.Icon icon="calendar" onPress={showDatepicker} />} // Abrir el DatePicker
        style={{ marginBottom: 10 }}
        editable={false} // Evitar que el usuario edite el campo manualmente
      />

      {/* ID y Número */}
      <View style={styles.row}>
        <TextInput
          label="ID"
          mode="outlined"
          style={[styles.input, styles.halfInput, { marginRight: 5 }]}
        />
        <TextInput
          label="Número"
          mode="outlined"
          style={[styles.input, styles.halfInput, { marginLeft: 5 }]}
        />
      </View>

      {/* Sexo */}
      <ThemedText>Sexo</ThemedText>
      <View style={styles.chipContainer}>
        <Chip
          mode="outlined"
          selected={sex === "Macho"}
          onPress={() => setSex("Macho")}
          style={styles.chip}
        >
          Macho
        </Chip>
        <Chip
          mode="outlined"
          selected={sex === "Hembra"}
          onPress={() => setSex("Hembra")}
          style={styles.chip}
        >
          Hembra
        </Chip>
      </View>

      {/* Estado reproductivo */}
      <ThemedText>Estado reproductivo</ThemedText>

      <View style={styles.chipContainer}>
        <Chip
          mode="outlined"
          selected={reproductiveStatus === "Reproductor"}
          onPress={() => setReproductiveStatus("Reproductor")}
          style={styles.chip}
        >
          Reproductor
        </Chip>
        <Chip
          mode="outlined"
          selected={reproductiveStatus === "Castrado"}
          onPress={() => setReproductiveStatus("Castrado")}
          style={styles.chip}
        >
          Castrado
        </Chip>
      </View>

      {/* Padre, Madre, Ubicación, Categorías */}
      <TextInput label="Padre" mode="outlined" style={styles.input} />
      <TextInput label="Madre" mode="outlined" style={styles.input} />
      <TextInput label="Ubicación" mode="outlined" style={styles.input} />
      <TextInput label="Categorías" mode="outlined" style={styles.input} />

      <ThemedText>Activo</ThemedText>
      <View style={styles.chipContainer}>
        <Chip
          mode="outlined"
          selected={state === "Activo"}
          onPress={() => setState("Activo")}
          style={styles.chip}
        >
          Activo
        </Chip>
        <Chip
          mode="outlined"
          selected={state === " Referencia"}
          onPress={() => setState(" Referencia")}
          style={styles.chip}
        >
          Referencia
        </Chip>
      </View>

      {/* Botón para crear caballo */}
      <Button
        mode="contained"
        onPress={() => console.log("Crear caballo")}
        style={styles.button}
        textColor="white"
      >
        Crear Caballo
      </Button>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    padding: 10,
    fontWeight: "500",
  },
  imageSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  imageButton: {
    backgroundColor: "#f2f2f2",
  },
  input: {
    marginBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  halfInput: {
    flex: 1,
  },
  chipContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  chip: {
    flex: 1,
    marginHorizontal: 5,
  },
  button: {
    marginTop: 20,

    backgroundColor: "green",
  },
});
