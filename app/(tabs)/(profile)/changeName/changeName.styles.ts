import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "90%",
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
  },
  userDataStyles: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 20, // Espacio entre el avatar y el input
  },
  nameInput: {
    width: 200,
    marginTop: 10,
  },
  btn: {
    marginTop: 30,
  },
});
