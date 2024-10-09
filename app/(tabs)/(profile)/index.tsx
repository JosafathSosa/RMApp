import React, { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Avatar, Button, IconButton } from "react-native-paper";
import { useRouter } from "expo-router";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import * as ImagePicker from "expo-image-picker"; // Para seleccionar la imagen
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage"; // Firebase Storage
import Toast from "react-native-toast-message";

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null); // Estado para la imagen
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  // Manejar la selección de la nueva imagen
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      // Subir la imagen seleccionada a Firebase
      uploadImageToFirebase(result.assets[0].uri);
    }
  };

  const uploadImageToFirebase = async (uri: string) => {
    const storage = getStorage();
    const user = auth.currentUser;

    if (user) {
      try {
        // Obtener el blob de la imagen
        const response = await fetch(uri);
        const blob = await response.blob();

        // Crear una referencia a Firebase Storage con el UID del usuario
        const storageRef = ref(storage, `avatars/${user.uid}`);

        // Subir la imagen a Firebase Storage
        await uploadBytes(storageRef, blob);

        // Obtener la URL de la imagen subida
        const downloadUrl = await getDownloadURL(storageRef);

        // Actualizar el estado local con la nueva URL para refrescar el avatar
        setImage(downloadUrl);

        // Actualizar el perfil del usuario en Firebase Authentication
        await updateProfile(user, { photoURL: downloadUrl });

        // Mostrar un mensaje de éxito
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Foto de perfil actualizada con éxito",
        });
      } catch (error) {
        console.log("Error al subir la imagen:", error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al subir imagen",
        });
      }
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.replace("/login");
    });
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.userInfoContainer}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={120}
            source={{
              uri:
                image ||
                user?.photoURL ||
                "https://verdeyazul.diarioinformacion.com/wp-content/uploads/2021/10/horses-g4a417ec1c_1920.jpg",
            }}
            style={styles.avatar}
          />
          {/* Ícono de lápiz en la esquina inferior derecha */}
          <Pressable onPress={pickImage} style={styles.editIcon}>
            <IconButton
              icon="pencil"
              size={20}
              iconColor="white"
              containerColor="green"
              style={styles.iconButton}
            />
          </Pressable>
        </View>
        <ThemedText>{user?.email}</ThemedText>
      </ThemedView>

      <View>
        <Button
          mode="contained"
          buttonColor="green"
          textColor="white"
          style={styles.logoutBtn}
          onPress={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  userInfoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 5,
    gap: 20,
    padding: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    marginVertical: 30,
  },
  editIcon: {
    position: "absolute",
    right: 0,
    bottom: 30,
    backgroundColor: "green",
    borderRadius: 20,
  },
  iconButton: {
    width: 20,
    height: 20,
  },
  logoutBtn: {
    marginTop: 20,
  },
});
