import React, { useContext, useState } from "react";
import { AppContext } from "../../components/AppContext.js";

import { useSnackbar } from "notistack";

import { TextField, Button, Typography, Box, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

import { AccountCircle } from "@material-ui/icons";

import { useStyles } from "./styles";

import { ROLE } from "../../constants.js";

import useGetRegisteredTeachers from "../../hooks/services/useGetRegisteredTeachers";
import useGetRegisteredStudents from "../../hooks/services/useGetRegisteredStudents";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { role, setRole, setId, setUserDetails, userDetails } =
    useContext(AppContext);

  const { data: registeredTeachers } = useGetRegisteredTeachers();

  const { data: registeredStudents } = useGetRegisteredStudents();

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };
  const validateUser = (values) => {
    const validateTeacher =
      registeredTeachers &&
      registeredTeachers?.find(
        (element) =>
          element.email === values.email && element.password === values.password
      );

    const validateStudent =
      registeredStudents &&
      registeredStudents?.find(
        (element) =>
          element.email === values.email && element.password === values.password
      );
    if (validateTeacher) {
      setRole("TEACHER");
      setId(validateTeacher.id);
      setUserDetails(validateTeacher);
    } else if (validateStudent) {
      setId(validateStudent.id);
      setUserDetails(validateStudent);
      setRole("STUDENT");
    }

    return validateTeacher || validateStudent ? true : false;
  };

  const handleSubmit = async (values, actions) => {
    const validation = await validateUser(values);

    if (
      values.email === "hafsaFathima016@gmail.com" &&
      values.password === "hafsa"
    ) {
      setRole("ADMIN");
      setEnqueueSnackbar("Admin Logged in Succesfully", "success");
      navigate("/lms/home");
    } else if (validation) {
      setEnqueueSnackbar("Login SuccessFull", "success");
      navigate("/lms/home");
    } else {
      setEnqueueSnackbar("User not found", "error");
    }
  };

  return (
    <Grid className={classes.body}>
      <Grid className={classes.container}>
        <Typography variant="h4" className={classes.heading}>
          Newman's College
        </Typography>
        <AccountCircle className={classes.icon} />
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, action) => {
            handleSubmit(values, action);
          }}
          validate={(values) => {
            const errors = {};
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
                type="email"
                name="email"
                label="Email"
                variant="outlined"
              />
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid} // Disable the button when the form is invalid
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Login;
