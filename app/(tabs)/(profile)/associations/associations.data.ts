import * as Yup from "yup";

export function initialValues() {
  return {
    association: "",
  };
}

export function validationSchema() {
  return Yup.object({
    association: Yup.string().required("La asosiación es requerida"),
  });
}
