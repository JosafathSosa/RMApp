import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import {
  Modal,
  Portal,
  Button,
  Provider,
  TextInput,
  Title,
  Divider,
  IconButton,
} from "react-native-paper";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { initalValues, validationSchema } from "./locations.data";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { ThemedView } from "@/components/ThemedView";

interface Location {
  location: string;
}

export default function Index() {
  const [visible, setVisible] = useState<boolean>(false); // Estado para el modal
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);

  // Funciones para manejar la visibilidad del modal
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const formik = useFormik({
    initialValues: initalValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setIsLoading(true);
        const db = getDatabase();
        const locationsRef = ref(db, "locations");

        await push(locationsRef, { location: formValue.location });

        Toast.show({
          type: "success",
          text1: "Ubicación guardada exitosamente",
          position: "bottom",
        });

        setIsLoading(false);
        hideModal();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Hubo un error al guardar la ubicación",
          position: "bottom",
        });
      }
    },
  });

  useEffect(() => {
    const db = getDatabase();
    const categoriesRef = ref(db, "locations");

    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Transformamos los datos en un array de objetos Location
        const locationList: Location[] = Object.values(data) as Location[];
        setLocations(locationList); // Guardar los objetos de categoría
      }
    });
  }, []);

  return (
    <Provider>
      <View style={styles.container}>
        <ThemedView style={styles.categoryContainer}>
          <ThemedText style={styles.title}>Ubicaciones de caballos</ThemedText>

          <View>
            {locations.length > 0 ? (
              locations.map((location, index) => (
                <View style={styles.horseCategoryName} key={index}>
                  <ThemedText style={{ marginTop: 10 }}>
                    {location.location}
                  </ThemedText>
                  <View style={{ flexDirection: "row" }}>
                    <IconButton
                      icon="pencil"
                      onPress={() => console.log("Editar")}
                    />
                    <IconButton
                      icon="trash-can-outline"
                      onPress={() => console.log("Eliminar")}
                    />
                  </View>
                </View>
              ))
            ) : (
              <ThemedText style={{ textAlign: "center", marginTop: 20 }}>
                No hay categorías disponibles
              </ThemedText>
            )}
          </View>

          {/* Modal */}
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modalContainer}
            >
              <ThemedText style={styles.modalText}>
                Agrega el nombre de la ubicación
              </ThemedText>
              <TextInput
                placeholder="Nombre"
                mode="outlined"
                onChangeText={(text) => formik.setFieldValue("location", text)}
                error={
                  formik.touched.location && formik.errors.location
                    ? true
                    : false
                }
              />
              {formik.touched.location && formik.errors.location && (
                <Title style={styles.errorText}>{formik.errors.location}</Title>
              )}
              <Button
                mode="contained"
                textColor="white"
                buttonColor="green"
                loading={isLoading}
                onPress={() => formik.handleSubmit()}
                style={styles.closeButton}
              >
                Agregar
              </Button>
            </Modal>
          </Portal>
        </ThemedView>
        <Pressable
          onPress={showModal} // Muestra el modal al hacer clic
          style={({ pressed }) => [
            styles.AddHorseDetailButton,
            { transform: [{ scale: pressed ? 0.9 : 1 }] },
          ]}
        >
          <AntDesign name="pluscircle" size={45} color="green" />
        </Pressable>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  horseCategoryName: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  AddHorseDetailButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  modalContainer: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    gap: 15,
  },
  modalText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
  },
});
