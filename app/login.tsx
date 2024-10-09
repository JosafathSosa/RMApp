import { View, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "expo-router";
import { TextInput, Button, Title } from "react-native-paper";
import { useFormik } from "formik";
import {
  validationSchema,
  initialValues,
} from "../components/auth/LoginForm.data";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false); // Para mostrar un estado de carga
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        setLoading(false);
        router.replace("/(tabs)"); // Redirige a la pantalla protegida
      } catch (error) {
        setLoading(false);
        console.log(error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Usuario y/o contraseña incorrecta",
        });
      }
    },
  });

  return (
    <View style={styles.container}>
      <Title style={styles.title1}>Rancho Mezquite</Title>
      <Title style={styles.title}>Inicia Sesion</Title>

      <TextInput
        label="Correo"
        onChangeText={(text) => formik.setFieldValue("email", text)}
        keyboardType="email-address"
        activeOutlineColor="green"
        mode="outlined"
        style={styles.input}
        error={formik.touched.email && formik.errors.email ? true : false}
      />
      {formik.touched.email && formik.errors.email && (
        <Title style={styles.errorText}>{formik.errors.email}</Title>
      )}

      <TextInput
        label="Contraseña"
        onChangeText={(text) => formik.setFieldValue("password", text)}
        secureTextEntry
        activeOutlineColor="green"
        mode="outlined"
        style={styles.input}
        error={formik.touched.password && formik.errors.password ? true : false}
      />
      {formik.touched.password && formik.errors.password && (
        <Title style={styles.errorText}>{formik.errors.password}</Title>
      )}

      <View style={styles.buttonView}>
        <Button
          mode="contained"
          buttonColor="green"
          textColor="white"
          onPress={() => formik.handleSubmit()} // Llamar correctamente handleSubmit
          loading={loading} // Mostrar estado de carga
          style={styles.button}
        >
          Login
        </Button>

        <Button
          mode="text"
          textColor="green"
          onPress={() => console.log("Navigate to Sign Up")}
          style={styles.button}
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title1: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 50,
    textAlign: "center",
  },
  input: {
    marginBottom: 20,
    width: "100%",
  },
  buttonView: {
    marginTop: 30,
  },
  button: {
    marginTop: 10,
  },

  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
  },
});
