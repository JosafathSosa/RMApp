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
import { initialValues, validationSchema } from "./associations.data";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { ThemedView } from "@/components/ThemedView";
import { LoadingModal } from "@/components/shared/loadingModal/LoadingModal";

interface Association {
  id: string;
  association: string;
}

export default function Index() {
  const [visible, setVisible] = useState<boolean>(false); // Estado para el modal
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [association, setAssociation] = useState<Association[]>([]);

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
        const associationsRef = ref(db, "associations");

        await push(associationsRef, { association: formValue.association });

        Toast.show({
          type: "success",
          text1: "Asociación guardada exitosamente",
          position: "bottom",
        });

        setIsLoading(false);
        hideModal();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Hubo un error al guardar la asociación",
          position: "bottom",
        });
      }
    },
  });

  useEffect(() => {
    setIsLoading(true);
    const db = getDatabase();
    const breedsRef = ref(db, "associations");

    onValue(breedsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const associationsList = Object.keys(data).map((key) => ({
          id: key,
          association: data[key].association,
        }));
        setAssociation(associationsList);
      }
      setIsLoading(false);
    });
  }, []);

  const deleteAssociation = async (associationId: string) => {
    try {
      setIsLoading(true);
      const db = getDatabase();
      const associationRef = ref(db, `associations/${associationId}`);

      await remove(associationRef);

      Toast.show({
        type: "success",
        text1: "Asociación eliminada exitosamente",
        position: "bottom",
      });
      setIsLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Hubo un error al eliminar la asociación",
        position: "bottom",
      });
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <ThemedView style={styles.categoryContainer}>
          <ThemedText style={styles.title}>Asociaciones</ThemedText>

          <View>
            {association.length > 0 ? (
              association.map((association, key) => (
                <View style={styles.horseCategoryName} key={key}>
                  <ThemedText style={{ marginTop: 10 }}>
                    {association.association}
                  </ThemedText>
                  <View style={{ flexDirection: "row" }}>
                    <IconButton
                      icon="pencil"
                      onPress={() => console.log("Editar")}
                    />
                    <IconButton
                      icon="trash-can-outline"
                      onPress={() => deleteAssociation(association.id)}
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
                Agrega el nombre de la asociación
              </ThemedText>
              <TextInput
                placeholder="Asociación"
                mode="outlined"
                onChangeText={(text) =>
                  formik.setFieldValue("association", text)
                }
                error={
                  formik.touched.association && formik.errors.association
                    ? true
                    : false
                }
              />
              {formik.touched.association && formik.errors.association && (
                <Title style={styles.errorText}>
                  {formik.errors.association}
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
