import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const RegistrationForm = () => {
  const initialValues = {
    email: "",
    // Other form fields
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // Other field validations
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        values
      );
      console.log(response.data);
      // Redirect to a success page or display a message that a confirmation email has been sent
    } catch (error) {
      console.log(error);
      // Handle error response
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" id="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          {/* Other form fields */}

          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
