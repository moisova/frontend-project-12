import * as yup from "yup";

export const authValidator = yup.object({
  username: yup.string().required("validation.required"),
  password: yup.string().required("validation.required"),
});
