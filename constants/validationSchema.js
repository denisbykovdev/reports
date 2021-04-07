import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  // email: Yup.string()
  //   .required("Please enter valid email address")
  //   .email()
  //   .label("Email"),
  password: Yup.string()
    .required(' יש טעות באחד השדות')
    .min(6, "not less than 6 symbols")
    .label("Password"),
});