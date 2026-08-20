import * as yup from "yup";

export const signupValidator = yup.object({
  username: yup
    .string()
    .required("validation.required")
    .min(3, "validation.usernameRange")
    .max(20, "validation.usernameRange"),
  password: yup
    .string()
    .required("validation.required")
    .min(6, "validation.passwordMin"),
  confirmPassword: yup
    .string()
    .required("validation.required")
    .oneOf([yup.ref("password")], "validation.mustMatch"),
});
