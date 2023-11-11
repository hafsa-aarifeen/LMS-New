import React from "react";
import { TextField, Button, Typography, Box, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";

import DialogBox from "../../DialogBox";

import useRegisterStudent from "../../../hooks/services/useRegisterStudent";

import { AccountCircle } from "@material-ui/icons";

import { useStyles } from "./styles";

const StudentRegistration = ({
  openRegisterStudents,
  setOpenRegisterStudents,
}) => {
  const classes = useStyles();

  const closeDialog = () => {
    setOpenRegisterStudents(false);
  };

  const { mutateAsync: registerStudent } = useRegisterStudent();

  const handleSubmit = (values) => {
    registerStudent(values);
    setOpenRegisterStudents(false);
  };

  return (
    <DialogBox
      title={"Register Student"}
      open={openRegisterStudents}
      setOpen={closeDialog}
      maxWidth="sm"
      height="800px"
      children={
        <Grid className={classes.container}>
          <Typography variant="h4" className={classes.heading}></Typography>
          <AccountCircle className={classes.icon} />
          <Formik
            initialValues={{
              studentName: "",
              studentId: "",
              email: "",
              role: "STUDENT",
              password: "",
              phonenumber: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validate={(values) => {
              const errors = {};
              if (!values.studentName) {
                errors.studentName = "Student Name is required";
              }
              if (!values.studentId) {
                errors.studentId = "Student Id is required";
              }
              if (!values.email) {
                errors.email = "Email is required";
              }
              if (!values.password) {
                errors.password = "Password is required";
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
                  name="studentName"
                  label="Student Name"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="studentId"
                  label="Student Id"
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
                  label="Password"
                  type="password"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="phonenumber"
                  label="Phone Number"
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid} // Disable the button when the form is invalid
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      }
    ></DialogBox>
  );
};

export default StudentRegistration;
