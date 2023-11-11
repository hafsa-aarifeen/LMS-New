import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom"; // If using React Router
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
    marginRight: theme.spacing(2),
  },
  activeLink: {
    color: "yellow", // Change the color for the active tab as desired
    textDecoration: "underline",
  },
}));

const NavigationBar = () => {
  const classes = useStyles();
  const location = useLocation(); // If using React Router, this helps in determining the current path

  return (
    <>
      <Grid className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              My App
            </Typography>
            <Link
              to="/lms/home"
              className={`${classes.link} ${
                location.pathname === "/lms/home" ? classes.activeLink : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`${classes.link} ${
                location.pathname === "/dashboard" ? classes.activeLink : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/courses"
              className={`${classes.link} ${
                location.pathname === "/courses" ? classes.activeLink : ""
              }`}
            >
              Courses
            </Link>
          </Toolbar>
        </AppBar>
      </Grid>
      <Outlet />
    </>
  );
};

export default NavigationBar;
