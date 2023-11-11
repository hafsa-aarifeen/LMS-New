import React from "react";
import { TextField, Button, Typography, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";

import useRegisterTeacher from "../../../hooks/services/useRegisterTeacher";

import DialogBox from "../../DialogBox";

import { AccountCircle } from "@material-ui/icons";

import { useStyles } from "./styles";

const TeacherRegistration = ({
  openRegisterTeacher,
  setOpenRegisterTeacher,
}) => {
  const classes = useStyles();
  const { mutateAsync: registerTeacher } = useRegisterTeacher();

  const handleSubmit = (values) => {
    registerTeacher(values);
    setOpenRegisterTeacher(false);
  };

  const closeDialog = () => {
    setOpenRegisterTeacher(false);
  };

  return (
    <DialogBox
      title={"Register Teacher"}
      open={openRegisterTeacher}
      setOpen={closeDialog}
      maxWidth="sm"
      height="700px"
      children={
        <Grid className={classes.container}>
          <AccountCircle className={classes.icon} />
          <Typography variant="h4" className={classes.heading}>
            Register Teacher
          </Typography>
          <Formik
            initialValues={{
              name: "",
              email: "",
              role: "TEACHER",
              password: "",
              qualification: "",
              teacherId: "",
              location: ""
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Name is required";
              }
              if (!values.email) {
                errors.email = "Email is required";
              }
              if (!values.password) {
                errors.password = "Password is required";
              }
              if (!values.qualification) {
                errors.qualification = "Qualification is required";
              }
              if (!values.teacherId) {
                errors.teacherId = "Teacher ID is required";
              }
              return errors;
            }}
          >
            {({ isValid = false }) => (
              <Form className={classes.form}>
                <Field
                  as={TextField}
                  name="role"
                  label="ROLE"
                  variant="outlined"
                  disabled={true}
                />
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="teacherId"
                  label="Teacher ID"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                />
                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="qualification"
                  label="Qualification"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="location"
                  label="Location"
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  disabled={!isValid} // Disable the button when the form is invalid
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      }
    />
  );
};

export default TeacherRegistration;
