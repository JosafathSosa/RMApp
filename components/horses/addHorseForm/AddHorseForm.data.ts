import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    id: "",
    phone: "",
    father: "",
    mother: "",
    location: "",
    category: "",
    birthDate: "",
    sex: "",
    reproductiveState: "",
    status: "",
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    id: Yup.string().required("El ID es obligatorio"),
    phone: Yup.string()
      .matches(/^\d+$/, "El número debe ser solo dígitos")
      .max(10, "Deben ser máximo 10 digitos"),
    father: Yup.string(),
    mother: Yup.string(),
    location: Yup.string().required("La ubicación es obligatoria"),
    category: Yup.string().required("Las categorías son obligatorias"),
    birthDate: Yup.date()
      .required("La fecha de nacimiento es obligatoria")
      .typeError("La fecha no es válida"),
    sex: Yup.string().required("El sexo es necesario"),
    reproductiveState: Yup.string().required(
      "El estado reproductivo es necesario"
    ),
    status: Yup.string().required("El estado es necesario"),
  });
}
