import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { AppContext } from "../../../components/AppContext.js/index.jsx";

import { Grid, FormControl } from "@material-ui/core";
import { Button } from "@mui/material";

import { NoteAddRounded } from "@material-ui/icons";

import { ROLE } from "../../../constants.js";

import PageLayout from "../../../components/PageLayout/index.jsx";

import useGetTeacherById from "../../../hooks/services/useGetTeacherById";
import useGetTeacherCourses from "../../../hooks/services/useGetTeacherCourses.js";

import { styles } from "./styles.js";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect/index.js";
import AssignCourses from "../AssignCourses/index.jsx";
import TemplateTypeTile from "../../../components/TemplateTypeTile/index.jsx";

import { IMAGES } from "../../../images.js";

const TeachersProfile = () => {
  const classes = styles();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [openAssignCourse, setOpenAssignCourse] = useState(false);
  const handleAssignCourse = () => {
    setOpenAssignCourse(true);
  };
  const { data: teachersListDataById } = useGetTeacherById({
    teacherId: id,
  });

  const { role } = useContext(AppContext);

  const { data: getTeacherCourses } = useGetTeacherCourses({ teacherId: id });

  const uniqueCourses = getTeacherCourses?.reduce((acc, item) => {
    if (!acc.find((course) => course.courseId === item.courseId)) {
      acc.push(item);
    }
    return acc;
  }, []);

  uniqueCourses?.map((element) => {
    IMAGES?.forEach((imgs) => {
      element.img = imgs;
    });
  });

  const handleClick = (element) => {
    navigate(`/lms/courses/units/${element?.courseId}`, {
      state: { courseId: element.courseId, courseName: element.courseName },
    });
  };

  return (
    <>
      <PageLayout
        pageHeading={"Teacher Page"}
        helperText={"Teacher Dashboard"}
        pageActions={
          role === ROLE.ADMIN && (
            <Grid>
              <Button
                id="btn-assignCourses"
                variant="contained"
                onClick={handleAssignCourse}
              >
                <NoteAddRounded className={classes.plusIcon} />
                {"Assign Courses"}
              </Button>
            </Grid>
          )
        }
      >
        <Grid container spacing={2} className={classes.topCards}>
          <Grid item xs={2} className={classes.section}>
            <LabelledEditableSelect
              label="Teacher Name"
              placeholder={location.state.name}
            />
          </Grid>
          <Grid item xs={2} className={classes.section}>
            <LabelledEditableSelect
              label="Qualification"
              placeholder={location.state.qualification}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.templateContainer}>
          {uniqueCourses?.map((element) => (
            <Grid item xs={6}>
              <TemplateTypeTile
                handleClick={() => handleClick(element)}
                height={"80%"}
                templateTitle={element.courseName}
                templateDescription={element.courseDescription}
                img={element.img}
              />
            </Grid>
          ))}
        </Grid>
      </PageLayout>

      {teachersListDataById && (
        <AssignCourses
          openAssignCourse={openAssignCourse}
          setOpenAssignCourse={setOpenAssignCourse}
          teacherDetails={teachersListDataById}
        />
      )}
    </>
  );
};

export default TeachersProfile;
