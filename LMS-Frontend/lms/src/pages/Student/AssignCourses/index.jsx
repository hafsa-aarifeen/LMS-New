import React, { useState } from "react";
import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import { Button, FormControl } from "@mui/material";

import { useSnackbar } from "notistack";

import { styles } from "./styles";

import DialogBox from "../../../components/DialogBox";
import LabeledTextField from "../../../components/LabeledTextField";

import useAssignStudentCourses from "../../../hooks/services/useAssignStudentCourses";
import useGetCourse from "../../../hooks/services/useGetCourse";

import { AddCircleOutline } from "@mui/icons-material";
import Courses from "./courses";

const AssignCourses = ({
  setOpenAssignCourse,
  openAssignCourse,
  courseName,
  studentDetails,
}) => {
  const classes = styles();
  const [openAddCourse, setOpenAddCourse] = useState(false);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState([]);
  const { data: courseData } = useGetCourse({ courseName: courseName });

  const coursesList = courseData?.map(({ id, courseName }) => ({
    name: courseName,
    value: courseName,
  }));

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };
  const handleOpenCourseAddFunc = () => {
    setOpenAddCourse(true);
  };
  const { mutateAsync: assignCoursesForStudents } = useAssignStudentCourses();

  const handleAddCourse = () => {
    const values = formik.values;
    courseData?.forEach((element) => {
      if (values.courses === element.courseName) {
        const obj = {
          courseName: element.courseName,
          courseDescription: element.courseDescription,
          grade: element.grade,
          courseId: element.courseId,
        };
        setSelectedCourseDetails([...selectedCourseDetails, obj]);
      }
    });
    formik.setFieldValue("courses", "");
  };
  const formik = useFormik({
    initialValues: {
      studentName: studentDetails ? studentDetails?.studentName : "",
      courses: "",
      email: studentDetails ? studentDetails?.email : "",
      studentId: studentDetails ? studentDetails?.studentId : "",
    },

    onSubmit: async (values) => {
      try {
        const student = {
          studentName: values.studentName,
          studentId: values.studentId,
          courses: selectedCourseDetails,
          email: values.email,
          password: values.email,
          teacherId: studentDetails.teacherId,
        };
        await assignCoursesForStudents(student);
        formik.resetForm();
        setEnqueueSnackbar("Course Assigned Successfully", "success");
      } catch (e) {
        setEnqueueSnackbar("Error Occured during course assigning", "error");
      }
    },
  });
  const closeDialog = () => {
    setOpenAssignCourse(false);
  };

  return (
    <>
      {studentDetails && (
        <DialogBox
          title={"Assign Course"}
          open={openAssignCourse}
          setOpen={closeDialog}
          maxWidth="sm"
          height="600px"
          children={
            <Grid
              container
              classes={{ container: classes.container }}
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <form onSubmit={formik.handleSubmit}>
                  <Grid xs={12} item className={classes.textField}>
                    <Grid item>
                      <Grid>
                        <FormControl fullWidth>
                          <LabeledTextField
                            id="studentName"
                            name="studentName"
                            label="Student Name"
                            placeholder="Enter Student Name"
                            onChange={(value) =>
                              formik.setFieldValue("studentName", value)
                            }
                            value={formik.values.studentName}
                            disbaled
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={12} item className={classes.textField}>
                    <Grid item>
                      <Grid>
                        <FormControl fullWidth>
                          <LabeledTextField
                            id="studentId"
                            name="studentId"
                            label="Student Id"
                            placeholder="Enter Student Id"
                            onChange={(value) =>
                              formik.setFieldValue("studentId", value)
                            }
                            value={formik.values.studentId}
                            disbaled
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={12} item className={classes.textField}>
                    <Grid item>
                      <Grid>
                        <FormControl fullWidth>
                          <LabeledTextField
                            id="email"
                            name="email"
                            label="Email"
                            placeholder="Enter Email"
                            onChange={(value) =>
                              formik.setFieldValue("email", value)
                            }
                            value={formik.values.email}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item className={classes.textField}>
                    <Grid item>
                      <Grid>
                        <Button
                          id="btn-create-purchase-order"
                          variant="contained"
                          onClick={handleOpenCourseAddFunc}
                          className={classes.itemNameButton}
                        >
                          <AddCircleOutline className={classes.plusIcon} />
                          {"Add Courses"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container className={classes.block}>
                    <Button
                      id="btn-general-info-next"
                      className={classes.button}
                      type="submit"
                      variant="contained"
                      disbaled={formik.isSubmitting}
                    >
                      Save
                    </Button>
                  </Grid>
                </form>
              </Grid>
              <Courses
                formik={formik}
                openAddCourse={openAddCourse}
                setOpenAddCourse={setOpenAddCourse}
                classes={classes}
                handleAddCourse={handleAddCourse}
                courses={selectedCourseDetails}
                coursesList={coursesList}
              />
            </Grid>
          }
        />
      )}
    </>
  );
};
export default AssignCourses;
