import * as yup from "yup";

export const channelValidator = (existingNames) =>
  yup.object({
    name: yup
      .string()
      .required("validation.required")
      .min(3, "validation.usernameRange")
      .max(20, "validation.usernameRange")
      .notOneOf(existingNames, "validation.exist"),
  });
