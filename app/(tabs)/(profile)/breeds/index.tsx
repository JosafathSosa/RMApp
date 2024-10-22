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
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { initialValues, validationSchema } from "./breeds.data";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { ThemedView } from "@/components/ThemedView";
import { getStorage } from "firebase/storage";
import { LoadingModal } from "@/components/shared/loadingModal/LoadingModal";

interface Breed {
  id: string;
  breed: string;
}

export default function Index() {
  const [visible, setVisible] = useState<boolean>(false); // Estado para el modal
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  // Funciones para manejar la visibilidad del modal
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setIsLoading(true);
        const db = getDatabase();
        const categoriesRef = ref(db, "breeds");

        await push(categoriesRef, { breed: formValue.breed });

        Toast.show({
          type: "success",
          text1: "Raza guardada exitosamente",
          position: "bottom",
        });

        setIsLoading(false);
        hideModal();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Hubo un error al guardar la raza",
          position: "bottom",
        });
      }
    },
  });

  useEffect(() => {
    setIsLoading(true);
    const db = getDatabase();
    const breedsRef = ref(db, "breeds");

    onValue(breedsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const breedsList = Object.keys(data).map((key) => ({
          id: key,
          breed: data[key].breed,
        }));
        setBreeds(breedsList);
      }
      setIsLoading(false);
    });
  }, []);

  const deleteBreed = async (breedId: string) => {
    try {
      setIsLoading(true);
      const db = getDatabase();
      const breedRef = ref(db, `breeds/${breedId}`);

      await remove(breedRef);

      Toast.show({
        type: "success",
        text1: "Raza eliminada exitosamente",
        position: "bottom",
      });
      setIsLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "La raza no se eliminó correctamente",
        position: "bottom",
      });
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <ThemedView style={styles.categoryContainer}>
          <ThemedText style={styles.title}>Razas de caballos</ThemedText>

          <View>
            {breeds.length > 0 ? (
              breeds.map((breed, key) => (
                <View style={styles.horseCategoryName} key={key}>
                  <ThemedText style={{ marginTop: 10 }}>
                    {breed.breed}
                  </ThemedText>
                  <View style={{ flexDirection: "row" }}>
                    <IconButton
                      icon="pencil"
                      onPress={() => console.log("Editar")}
                    />
                    <IconButton
                      icon="trash-can-outline"
                      onPress={() => deleteBreed(breed.id)}
                    />
                  </View>
                </View>
              ))
            ) : (
              <LoadingModal isLoading={isLoading} />
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
                Agrega el nombre de la raza
              </ThemedText>
              <TextInput
                placeholder="Raza"
                mode="outlined"
                onChangeText={(text) => formik.setFieldValue("breed", text)}
                error={
                  formik.touched.breed && formik.errors.breed ? true : false
                }
              />
              {formik.touched.breed && formik.errors.breed && (
                <Title style={styles.errorText}>{formik.errors.breed}</Title>
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
