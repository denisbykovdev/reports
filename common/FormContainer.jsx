import React, { Fragment } from "react";
import { Formik } from "formik";

export default function FormContainer({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  innerRef
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
      innerRef={innerRef}
    >
      {() => <Fragment>{children}</Fragment>}
    </Formik>
  );
}
