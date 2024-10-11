import * as Yup from "yup";

export function initalValues() {
  return {
    categoryName: "",
  };
}

export function validationSchema() {
  return Yup.object({
    categoryName: Yup.string().required("La categoria es necesaria"),
  });
}
