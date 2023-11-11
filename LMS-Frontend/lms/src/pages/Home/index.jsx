import React, { useContext, useState } from "react";
import { AppContext } from "../../components/AppContext.js";
import { useNavigate } from "react-router-dom";

import { Grid } from "@material-ui/core";

import { Button } from "@mui/material";

import PageLayout from "../../components/PageLayout";
import TemplateTypeTile from "../../components/TemplateTypeTile/index.jsx";
import MarkAttendance from "../Attendance/ManageAttendence/index.jsx";

import ManageCourse from "../Courses/ManageCourse";

import { useStyles } from "./styles";

import { ROLE } from "../../constants.js";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { IMAGES } from "../../images.js";

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [openCourseCreate, setOpenCourseCreate] = useState();
  const [openMarkAttendance, setOpenMarkAttendance] = useState(false);

  const { role, id, userDetails } = useContext(AppContext);
  const handleViewProfile = () => {
    if (role === ROLE.STUDENT) {
      navigate(`/lms/student/profile/${userDetails?.studentId}`, {
        state: {
          name: userDetails?.studentName,
          studentId: userDetails?.studentId,
        },
      });
    } else {
      navigate(`/lms/teachers/profile/${userDetails.teacherId}`, {
        state: {
          name: userDetails?.name,
          qualification: userDetails?.qualification,
        },
      });
    }
  };

  const handleCourses = () => {
    navigate("/lms/courses");
  };
  const handleTeachers = () => {
    navigate("/lms/teachers");
  };

  const handleStudents = () => {
    navigate("/lms/students");
  };

  const handleAttendence = () => {
    setOpenMarkAttendance(true);
  };

  return (
    <Grid className={classes.body}>
      <PageLayout
        pageHeading={"Home"}
        helperText={"Overview of courses"}
        pageActions={
          role !== ROLE.ADMIN && (
            <Grid>
              <Button
                id="btn-registerStudent"
                variant="contained"
                onClick={handleViewProfile}
              >
                {"Profile"}
                <PersonOutlinedIcon style={{ marginLeft: "14px" }} />
              </Button>
            </Grid>
          )
        }
      >
        <Grid container spacing={2} className={classes.templateContainer}>
          <Grid item xs={6}>
            {role === ROLE.ADMIN && (
              <TemplateTypeTile
                handleClick={handleCourses}
                height={"80%"}
                templateTitle="Courses"
                templateDescription="Click the tile to view courses"
                img={IMAGES[0]}
              />
            )}
          </Grid>
          {role === ROLE.ADMIN && (
            <Grid item xs={6}>
              <TemplateTypeTile
                handleClick={handleTeachers}
                height={"80%"}
                templateTitle="Teachers"
                templateDescription="Click the tile to view teachers"
                img={IMAGES[1]}
              />
            </Grid>
          )}
          {role === ROLE.ADMIN ? (
            <Grid item xs={6}>
              <TemplateTypeTile
                handleClick={handleStudents}
                height={"80%"}
                templateTitle="Students"
                templateDescription="Click the tile to view students"
                img={IMAGES[2]}
              />
            </Grid>
          ) : (
            <></>
          )}
          {role === ROLE.ADMIN ? (
            <Grid item xs={6}>
              <TemplateTypeTile
                handleClick={handleAttendence}
                height={"80%"}
                templateTitle="Attendence"
                templateDescription="Click the tile to mark attendence"
                img={IMAGES[3]}
              />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
        <Grid container className={classes.navigationButtons}>
          <Grid item>
            {/* <Button onClick={props.previousStep()}>Back</Button> */}
          </Grid>
        </Grid>
        <ManageCourse
          openItems={openCourseCreate}
          setOpenItems={setOpenCourseCreate}
        />
      </PageLayout>
      <MarkAttendance
        setOpenMarkAttendance={setOpenMarkAttendance}
        openMarkAttendance={openMarkAttendance}
      />
    </Grid>
  );
};
export default Home;
