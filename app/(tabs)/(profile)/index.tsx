import react from "react";
import { StyleSheet, Button, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { auth } from "../../../utils/firebase";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";

export default function ProfileScreen() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  console.log(user);

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.replace("/login");
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
