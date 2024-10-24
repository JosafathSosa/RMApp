import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router"; // Importa useRouter
import { getDatabase, onValue, ref as databaseRef } from "firebase/database";
import { LoadingModal } from "@/components/shared/loadingModal/LoadingModal";

interface Horse {
  id: string;
  name: string;
  birthDate: string;
  category: string;
  father: string;
  mother: string;
  location: string;
  phone: string;
  reproductiveState: string;
  sex: string;
  status: string;
  url: string; // Image URL
}

export const AllHorsesComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Obtiene el router
  const [horses, setHorses] = useState<Horse[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const db = getDatabase();
    const horsesRef = databaseRef(db, "horses");

    // Set up Firebase Realtime Database listener
    onValue(horsesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object into array and assign keys as ids
        const horsesArray: Horse[] = Object.keys(data).map((key) => ({
          ...data[key],
          id: key, // Use Firebase key as ID
        }));
        setHorses(horsesArray);
      }
      setIsLoading(false);
    });
  }, []);

  const renderItem = ({ item }: { item: Horse }) => (
    <TouchableOpacity
      onPress={() => {
        // Navigate to HorseDetailsScreen and pass the horse as parameter
        router.push({
          pathname: "/horseDetailsScreen",
          params: { id: item.id },
        });
      }}
    >
      <ThemedView style={styles.card}>
        <Image
          source={{
            uri: item.url || "https://via.placeholder.com/100", // Default image if no URL
          }}
          style={styles.image}
        />
        <View style={styles.info}>
          <ThemedText style={styles.name}>{item.name}</ThemedText>
          <ThemedText style={styles.desc}>
            Categoria: {item.category}
          </ThemedText>
          <ThemedText style={styles.desc}>Sexo: {item.sex}</ThemedText>
          <ThemedText style={styles.desc}>
            Ubicación: {item.location}
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, marginTop: 10, marginHorizontal: 10 }}>
      <FlatList
        data={horses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <LoadingModal isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  desc: {
    fontSize: 14,
  },
});
