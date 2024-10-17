import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { AntDesign } from "@expo/vector-icons";
import {
  Modal,
  Portal,
  Button,
  Provider,
  TextInput,
  Title,
  IconButton,
} from "react-native-paper";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { initalValues, validationSchema } from "./horseCategories.data";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { ThemedView } from "@/components/ThemedView";

interface Category {
  id: string;
  categoryName: string;
}

export default function Index() {
  const [visible, setVisible] = useState<boolean>(false); // Estado para el modal
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

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
        const categoriesRef = ref(db, "categories");

        await push(categoriesRef, { categoryName: formValue.categoryName });

        Toast.show({
          type: "success",
          text1: "Categoría guardada exitosamente",
          position: "bottom",
        });

        setIsLoading(false);
        hideModal();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Hubo un error al guardar la categoria",
          position: "bottom",
        });
      }
    },
  });

  useEffect(() => {
    const db = getDatabase();
    const categoriesRef = ref(db, "categories");

    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const categoryList = Object.keys(data).map((key) => ({
          id: key,
          categoryName: data[key].categoryName,
        }));
        setCategories(categoryList); // Guardar los objetos de categoría con ID
      }
    });
  }, []);

  const deleteCategory = async (categoryId: string) => {
    try {
      const db = getDatabase();
      const categoryRef = ref(db, `categories/${categoryId}`);

      await remove(categoryRef);

      Toast.show({
        type: "success",
        text1: "Categoría eliminada exitosamente",
        position: "bottom",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Hubo un error al eliminar la categoría",
        position: "bottom",
      });
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <ThemedView style={styles.categoryContainer}>
          <ThemedText style={styles.title}>Categoria de caballos</ThemedText>

          <View>
            {categories.length > 0 ? (
              categories.map((category, key) => (
                <View style={styles.horseCategoryName} key={key}>
                  <ThemedText style={{ marginTop: 10 }}>
                    {category.categoryName}
                  </ThemedText>
                  <View style={{ flexDirection: "row" }}>
                    <IconButton
                      icon="pencil"
                      onPress={() => console.log("Editar")}
                    />
                    <IconButton
                      icon="trash-can-outline"
                      onPress={() => deleteCategory(category.id)} // Eliminar categoría
                    />
                  </View>
                </View>
              ))
            ) : (
              <ThemedText>No hay categorías disponibles</ThemedText>
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
                Agrega el nombre de la categoria
              </ThemedText>
              <TextInput
                placeholder="Nombre"
                mode="outlined"
                onChangeText={(text) =>
                  formik.setFieldValue("categoryName", text)
                }
                error={
                  formik.touched.categoryName && formik.errors.categoryName
                    ? true
                    : false
                }
              />
              {formik.touched.categoryName && formik.errors.categoryName && (
                <Title style={styles.errorText}>
                  {formik.errors.categoryName}
                </Title>
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
