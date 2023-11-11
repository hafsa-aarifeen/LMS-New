import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext.js";
import { Link, Outlet, useLocation } from "react-router-dom";

import { ROLE } from "../../constants";

import { makeStyles } from "@mui/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SettingsIcon from "@mui/icons-material/Settings";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { Grid } from "@material-ui/core";
import img from "../../pictures/nav3.jpg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  navBar: {
    width: "200px",
    backgroundColor: "blue",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    display: "grid",
    height: "100vh",
    // backgroundImage: `url(${img})`,
    paddingLeft: "20px",
  },
  content: {
    flexGrow: 1,
    padding: "40px",
  },
  childContent: {
    paddingLeft: "240px",
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "black",
    textDecoration: "none",
    size: "10px",
  },

  activeLink: {
    color: "#095936", // Change the color for the active tab as desired
    textDecoration: "none",
  },
}));

const SideNavBar = () => {
  const classes = useStyles();
  const location = useLocation(); // If using React Router, this helps in determining the current path

  const { role } = useContext(AppContext);

  return (
    <>
      <Grid className={classes.navBar}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          position="static"
          open={true}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div>
            <List>
              <Link
                to="/lms/home"
                className={`${classes.link} ${
                  location.pathname === "/lms/home" ? classes.activeLink : ""
                }`}
              >
                <ListItem>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText className={classes.title} primary="Home" />
                </ListItem>
              </Link>
              {/* <Link
                to="/lms/home"
                className={`${classes.link} ${
                  location.pathname === "/lms/dashboard"
                    ? classes.activeLink
                    : ""
                }`}
              >
                <ListItem>
                  <ListItemIcon>
                    <ExploreIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </Link> */}
            </List>
            <Divider />
            {role === ROLE.ADMIN && (
              <>
                <List>
                  <Link
                    to="/lms/Courses"
                    className={`${classes.link} ${
                      location.pathname === "/lms/Courses"
                        ? classes.activeLink
                        : ""
                    }`}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <ImportContactsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Courses" />
                    </ListItem>
                  </Link>
                </List>
                <List>
                  <Link
                    to="/lms/Students"
                    className={`${classes.link} ${
                      location.pathname === "/lms/students"
                        ? classes.activeLink
                        : ""
                    }`}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <AccountBoxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Students" />
                    </ListItem>
                  </Link>
                </List>
                <List>
                  <Link
                    to="/lms/teachers"
                    className={`${classes.link} ${
                      location.pathname === "/lms/teachers"
                        ? classes.activeLink
                        : ""
                    }`}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <CastForEducationIcon />
                      </ListItemIcon>
                      <ListItemText primary="Teachers" />
                    </ListItem>
                  </Link>
                </List>
              </>
            )}
            <List>
              <Link
                to="/"
                className={`${classes.link} ${
                  location.pathname === "/" ? classes.activeLink : ""
                }`}
              >
                <ListItem>
                  <ListItemIcon>
                    <MeetingRoomIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </Link>
            </List>
          </div>
        </Drawer>
      </Grid>
      <Grid className={classes.childContent}>
        <Outlet />
      </Grid>
    </>
  );
};

export default SideNavBar;
