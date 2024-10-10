import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styles } from "./changeName.styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import { getAuth, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message"; // Para mostrar notificaciones

export default function Index() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newDisplayName, setNewDisplayName] = useState(""); // Estado para el nombre del usuario

  // Función para manejar el cambio de nombre de usuario
  const handleChangeDisplayName = () => {
    setIsLoading(true);
    if (user && newDisplayName) {
      updateProfile(user, {
        displayName: newDisplayName, // Actualiza el nombre del usuario
      })
        .then(() => {
          setIsLoading(false);
          Toast.show({
            type: "success",
            text1: "Listo! Inicia sesión nuevamente",
            position: "bottom",
          });
          console.log("Nombre actualizado a:", newDisplayName);
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: "Error al actualizar el nombre",
            text2: error.message,
            position: "bottom",
          });
        });
    } else {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Por favor, ingresa un nombre válido",
        position: "bottom",
      });
    }
  };

  return (
    <View style={styles.mainView}>
      <ThemedView style={styles.container}>
        <View style={styles.userDataStyles}>
          <Avatar.Image
            style={styles.avatar}
            size={80}
            source={{
              uri:
                user?.photoURL ||
                "https://verdeyazul.diarioinformacion.com/wp-content/uploads/2021/10/horses-g4a417ec1c_1920.jpg",
            }}
          />
          <View>
            <TextInput
              label="Nombre del usuario"
              value={newDisplayName}
              onChangeText={setNewDisplayName} // Actualiza el estado con el nuevo valor
              style={styles.nameInput}
              mode="outlined"
              activeOutlineColor="gray"
            />
          </View>
        </View>
      </ThemedView>
      <Button
        buttonColor="green"
        textColor="white"
        style={styles.btn}
        onPress={handleChangeDisplayName} // Llamada a la función al presionar el botón
        loading={isLoading}
      >
        Cambiar nombre
      </Button>
    </View>
  );
}
