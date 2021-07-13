import { yupToFormErrors } from "formik";
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

export const passChangeSchema = Yup.object().shape({
  password: Yup.string()
    .required(' יש טעות באחד השדות')
    .min(6, "not less than 6 symbols"),
  // .label("Password"),
  password_confirmation: Yup.string()
    .required(' יש טעות באחד השדות')
    // .min(6, "not less than 6 symbols")
    // .label("Password")
    // .when('password', {
    //   is: password => (password && password.length > 0 ? true : false),
    //   then: Yup.string().oneOf([Yup.ref('password'), "password doesn't match"])
    // })
    .test(
      'passwords-match',
      'ססמאות חייבות להתאים',
      function (value) { return this.parent.password === value }
    )
})