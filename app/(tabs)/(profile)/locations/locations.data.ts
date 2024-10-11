import * as Yup from "yup";

export function initalValues() {
  return {
    location: "",
  };
}

export function validationSchema() {
  return Yup.object({
    location: Yup.string().required("La ubicación es requerida"),
  });
}
