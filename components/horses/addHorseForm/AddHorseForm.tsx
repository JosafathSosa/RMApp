import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
  TextInput,
  Button,
  Chip,
  IconButton,
  Menu,
  Avatar,
} from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddHorseForm.data";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import {
  getDatabase,
  onValue,
  ref as databaseRef,
  push,
} from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { LoadingModal } from "@/components/shared/loadingModal/LoadingModal";
import { useRouter } from "expo-router";

export const AddHorseForm = () => {
  const router = useRouter();
  const [horseImage, setHorseImage] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [locationMenuVisible, setLocationMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const db = getDatabase();

    const categoriesRef = databaseRef(db, "categories");
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCategories(
          Object.values(data).map((item: any) => item.categoryName)
        );
      }
    });

    const locationRef = databaseRef(db, "locations");
    onValue(locationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLocations(Object.values(data).map((item: any) => item.location));
      }
    });
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setHorseImage(result.assets[0].uri);
    }
  };

  const uploadImageToFirebase = async (uri: string) => {
    setIsLoading(true);
    const storage = getStorage();

    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRefe = storageRef(
        storage,
        `horsesImages/${Date.now()}-image.jpg`
      );
      await uploadBytes(storageRefe, blob);

      const url = await getDownloadURL(storageRefe);

      setIsLoading(false);

      return url;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al subir la imagen",
        position: "bottom",
      });
      return "";
    }
  };

  const handleSelectCategory = (category: string) => {
    formik.setFieldValue("category", category);
    setCategoryMenuVisible(false);
  };

  const handleSelectLocation = (location: string) => {
    formik.setFieldValue("location", location);
    setLocationMenuVisible(false);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log(formValue);

        setIsLoading(true);
        let imageUrl = "";

        if (horseImage) {
          imageUrl = await uploadImageToFirebase(horseImage);
        }
        const horseDataForm = {
          ...formValue,
          url: imageUrl,
        };

        const db = getDatabase();
        const horsesRef = databaseRef(db, "horses");

        await push(horsesRef, horseDataForm);

        Toast.show({
          type: "success",
          text1: "Caballo guardado correctamente",
          position: "bottom",
        });

        setIsLoading(false);
        router.back();
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
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    // Pasar la fecha como valor a Formik
    formik.setFieldValue("birthDate", currentDate);
  };

  const showDatepicker = () => {
    setShow((value) => !value);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Sección de las imágenes */}
      <ThemedText style={styles.title}>Agrega un caballo</ThemedText>
      <View style={styles.imageSection}>
        <Avatar.Image
          size={150}
          source={{
            uri:
              horseImage ||
              "https://i0.wp.com/thegroomslist.co.uk/wp-content/uploads/2019/03/5-differences-between-horses-as-a-hobby-and-as-a-career.jpg?fit=1002%2C667&ssl=1",
          }}
        />
        <IconButton
          icon="plus"
          size={20}
          iconColor="white"
          containerColor="green"
          style={styles.editIcon}
          onPress={pickImage}
        />
      </View>

      {/* Nombre */}
      <TextInput
        label="Nombre"
        mode="outlined"
        style={styles.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        error={formik.touched.name && formik.errors.name ? true : false}
      />
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
        value={
          formik.values.birthDate
            ? new Date(formik.values.birthDate).toLocaleDateString()
            : ""
        } // Mostrar la fecha seleccionada
        mode="outlined"
        right={<TextInput.Icon icon="calendar" onPress={showDatepicker} />}
        style={{ marginBottom: 10 }}
        editable={false}
        error={
          formik.touched.birthDate && formik.errors.birthDate ? true : false
        }
      />

      {/* ID y Número */}
      <View style={styles.row}>
        <TextInput
          label="ID"
          mode="outlined"
          style={[styles.input, styles.halfInput, { marginRight: 5 }]}
          onChangeText={(text) => formik.setFieldValue("id", text)}
          error={formik.touched.id && formik.errors.id ? true : false}
        />
        <TextInput
          label="Número"
          mode="outlined"
          style={[styles.input, styles.halfInput, { marginLeft: 5 }]}
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          error={formik.touched.phone && formik.errors.phone ? true : false}
        />
      </View>

      {/* Sexo */}
      <ThemedText>Sexo</ThemedText>
      <View style={styles.chipContainer}>
        <Chip
          mode="outlined"
          selected={formik.values.sex === "Macho"}
          onPress={() => formik.setFieldValue("sex", "Macho")}
          style={styles.chip}
        >
          Macho
        </Chip>
        <Chip
          mode="outlined"
          selected={formik.values.sex === "Hembra"}
          onPress={() => formik.setFieldValue("sex", "Hembra")}
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
          selected={formik.values.reproductiveState === "Reproductor"}
          onPress={() =>
            formik.setFieldValue("reproductiveState", "Reproductor")
          }
          style={styles.chip}
        >
          Reproductor
        </Chip>
        <Chip
          mode="outlined"
          selected={formik.values.reproductiveState === "Castrado"}
          onPress={() => formik.setFieldValue("reproductiveState", "Castrado")}
          style={styles.chip}
        >
          Castrado
        </Chip>
      </View>

      {/* Padre, Madre, Ubicación, Categorías */}
      <TextInput
        label="Padre"
        mode="outlined"
        style={styles.input}
        onChangeText={(text) => formik.setFieldValue("father", text)}
      />

      <TextInput
        label="Madre"
        mode="outlined"
        style={styles.input}
        onChangeText={(text) => formik.setFieldValue("mother", text)}
      />

      <View>
        <Menu
          visible={categoryMenuVisible}
          onDismiss={() => setCategoryMenuVisible(false)}
          anchor={
            <TextInput
              label="Categoría"
              mode="outlined"
              value={formik.values.category}
              style={styles.input}
              editable={false} // Desactivar edición manual
              right={
                <TextInput.Icon
                  icon="menu-down"
                  onPress={() => setCategoryMenuVisible(true)}
                />
              } // Icono de menú para desplegar las opciones
              error={
                formik.touched.category && formik.errors.category ? true : false
              }
            />
          }
        >
          {categories.map((category, index) => (
            <Menu.Item
              key={index}
              onPress={() => handleSelectCategory(category)}
              title={category}
            />
          ))}
        </Menu>
        <Menu
          visible={locationMenuVisible}
          onDismiss={() => setLocationMenuVisible(false)}
          anchor={
            <TextInput
              label="Ubicación"
              mode="outlined"
              value={formik.values.location}
              style={styles.input}
              editable={false} // Desactivar edición manual
              right={
                <TextInput.Icon
                  icon="menu-down"
                  onPress={() => setLocationMenuVisible(true)}
                />
              } // Icono de menú para desplegar las opciones
              error={
                formik.touched.location && formik.errors.location ? true : false
              }
            />
          }
        >
          {locations.map((location, index) => (
            <Menu.Item
              key={index}
              onPress={() => handleSelectLocation(location)}
              title={location}
            />
          ))}
        </Menu>
      </View>

      <ThemedText>Activo</ThemedText>
      <View style={styles.chipContainer}>
        <Chip
          mode="outlined"
          selected={formik.values.status === "Activo"}
          onPress={() => formik.setFieldValue("status", "Activo")}
          style={styles.chip}
        >
          Activo
        </Chip>
        <Chip
          mode="outlined"
          selected={formik.values.status === "Referencia"}
          onPress={() => formik.setFieldValue("status", "Referencia")}
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
        loading={isLoading}
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
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
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
