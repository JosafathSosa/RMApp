import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, Divider, IconButton } from "react-native-paper";
import { useRouter, Href } from "expo-router";
import {
  getAuth,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import Toast from "react-native-toast-message";

type Routes =
  | `/changeName`
  | `/horseCategories`
  | `/locations`
  | `/breeds`
  | `/coats`
  | `/associations`
  | `${string}`;

type Option = {
  icon: string; // Nombre del ícono
  name: string; // Nombre de la opción
  path: Routes;
};

const options: Option[] = [
  { icon: "account", name: "Cambiar nombre", path: "/changeName" },
  { icon: "horse", name: "Categorías de caballos", path: "/horseCategories" },
  { icon: "map-marker", name: "Ubicaciones", path: "/locations" },
  { icon: "horseshoe", name: "Razas", path: "/breeds" },
  { icon: "cow", name: "Pelos", path: "/coats" },
  { icon: "certificate", name: "Asociaciones", path: "/associations" },
];

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null); // Estado para la imagen
  const router = useRouter();
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Escuchar los cambios de autenticación y actualizar el estado del usuario
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // Actualizar el estado del usuario al iniciar sesión o actualizar el perfil
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe(); // Desuscribirse del listener cuando el componente se desmonte
  }, [auth]);

  // Manejar la selección de la nueva imagen
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      uploadImageToFirebase(result.assets[0].uri);
    }
  };

  const uploadImageToFirebase = async (uri: string) => {
    const storage = getStorage();
    const user = auth.currentUser;

    if (user) {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(storageRef, blob);
        const downloadUrl = await getDownloadURL(storageRef);
        setImage(downloadUrl);
        await updateProfile(user, { photoURL: downloadUrl });

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

  // Función para manejar la navegación
  const handleNavigation = (item: Option) => {
    if (item.path) {
      router.push(item.path as Href); // Sin usar el objeto pathname, solo pasamos la ruta directamente
    } else {
      console.log("Ruta no definida para esta opción.");
    }
  };

  // Función para renderizar cada ítem de la lista de opciones
  const renderItem = ({ item }: { item: Option }) => (
    <TouchableOpacity onPress={() => handleNavigation(item)}>
      <ThemedView>
        <View style={styles.optionContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton icon={item.icon} size={20} />
            <ThemedText>{item.name}</ThemedText>
          </View>
          <IconButton icon="arrow-right" size={17} iconColor="gray" />
        </View>
        <Divider />
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ThemedView style={styles.userInfoContainer}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={100}
            source={{
              uri:
                image ||
                currentUser?.photoURL ||
                "https://verdeyazul.diarioinformacion.com/wp-content/uploads/2021/10/horses-g4a417ec1c_1920.jpg",
            }}
            style={styles.avatar}
          />
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
        <View style={styles.displayNameContainer}>
          <ThemedText style={styles.displayName}>
            Bienvenido {currentUser?.displayName || ""}
          </ThemedText>
          <Divider />
          <ThemedText>{currentUser?.email}</ThemedText>
        </View>
      </ThemedView>

      {/* FlatList que muestra las opciones */}
      <View style={styles.flatList}>
        <FlatList
          data={options}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          scrollEnabled={false}
        />
      </View>
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
    width: "90%",
    height: 150,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
    gap: 20,
    padding: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    marginVertical: 30,
  },
  displayNameContainer: {
    gap: 10,
  },
  displayName: {
    fontSize: 20,
    marginBottom: 6,
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
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,

    height: 50,
  },
  flatList: {
    width: "90%",
    marginTop: 30,
    borderRadius: 10,
    overflow: "hidden",
  },
  logoutBtn: {
    marginTop: 20,
  },
});
