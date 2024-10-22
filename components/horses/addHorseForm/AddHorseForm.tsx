import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TextInput, Button, Chip, IconButton, Title } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddHorseForm.data";
import Toast from "react-native-toast-message";

export const AddHorseForm = () => {
  const [sex, setSex] = useState("Macho");
  const [state, setState] = useState("Activo");

  const [reproductiveStatus, setReproductiveStatus] = useState("Reproductor");

  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log(formValue);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Hubo un error al registrar al caballo",
          position: "bottom",
        });
      }
    },
  });

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
        {[...Array(1)].map((_, index) => (
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
      <TextInput
        label="Nombre"
        mode="outlined"
        style={styles.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        error={formik.touched.name && formik.errors.name ? true : false}
      />
      {formik.touched.name && formik.errors.name && (
        <Title style={styles.errorText}>{formik.errors.name}</Title>
      )}
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
        onChangeText={(text) => formik.setFieldValue("birthDate", text)}
      />
      {formik.touched.birthDate && formik.errors.birthDate && (
        <Title style={styles.errorText}>{formik.errors.birthDate}</Title>
      )}
      {/* ID y Número */}
      <View style={styles.row}>
        <TextInput
          label="ID"
          mode="outlined"
          style={[styles.input, styles.halfInput, { marginRight: 5 }]}
          onChangeText={(text) => formik.setFieldValue("id", text)}
        />
        <TextInput
          label="Número"
          mode="outlined"
          style={[styles.input, styles.halfInput, { marginLeft: 5 }]}
          onChangeText={(text) => formik.setFieldValue("phone", text)}
        />
      </View>
      {formik.touched.id && formik.errors.id && (
        <Title style={styles.errorText}>{formik.errors.id}</Title>
      )}
      {formik.touched.phone && formik.errors.phone && (
        <Title style={styles.errorText}>{formik.errors.phone}</Title>
      )}
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
        onPress={() => formik.handleSubmit()}
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
  },
});
