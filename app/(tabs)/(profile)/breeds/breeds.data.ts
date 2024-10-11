import * as Yup from "yup";

export function initialValues() {
  return {
    breed: "",
  };
}

export function validationSchema() {
  return Yup.object({
    breed: Yup.string().required("Se necesita la raza"),
  });
}
