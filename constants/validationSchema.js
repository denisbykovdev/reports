import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter valid email address")
    .email()
    .label("Email"),
  password: Yup.string()
    .required()
    .min(6, "6 symbols, lowercase letter, uppercase letter, special symbol")
    .label("Password"),
});