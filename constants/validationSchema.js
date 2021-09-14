import * as Yup from "yup";

export const newAreaSchema = Yup.object().shape({
  newAreaName: Yup.string()
    .required(' יש טעות באחד השדות')
})

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
    .min(6, "לא פחות מ -6 תווים"),
  password_confirmation: Yup.string()
    .required(' יש טעות באחד השדות')
    .test(
      'passwords-match',
      'ססמאות חייבות להתאים',
      function (value) { return this.parent.password === value }
    )
});

export const AddUserSchema = Yup.object().shape({
  password: Yup.string().required('יש טעות באחד השדות').min(6, "לא פחות מ -6 תווים"),
  email: Yup.string().required('יש טעות באחד השדות'),
  phone: Yup.string().required('יש טעות באחד השדות'),
  last_name: Yup.string().required('יש טעות באחד השדות'),
  name: Yup.string().required('יש טעות באחד השדות')
});

export const ReportSchema = Yup.object().shape({
  id: Yup.string().required('יש טעות באחד השדות')
});