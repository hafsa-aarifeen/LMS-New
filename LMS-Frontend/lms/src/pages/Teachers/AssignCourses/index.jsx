import React, { useState } from "react";
import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import { Button, FormControl } from "@mui/material";

import { useSnackbar } from "notistack";

import { styles } from "./styles";

import DialogBox from "../../../components/DialogBox";
import LabeledTextField from "../../../components/LabeledTextField";

import useAssignTeacherCourses from "../../../hooks/services/useAssignTeacherCourses";
import useGetCourse from "../../../hooks/services/useGetCourse";

import { AddCircleOutline } from "@mui/icons-material";
import Courses from "./courses";

const AssignCourses = ({
  setOpenAssignCourse,
  openAssignCourse,
  courseName,
  teacherDetails,
}) => {
  const classes = styles();
  const [openAddCourse, setOpenAddCourse] = useState(false);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
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
  const { mutateAsync: assignCourses } = useAssignTeacherCourses();

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
    const teacher = {
      name: values.name,
      qualification: values.qualification,
      courses: selectedCourseDetails,
      email: values.email,
    };
    setTeacherData([...teacherData, teacher]);
    formik.setFieldValue("courses", "");
  };
  const formik = useFormik({
    initialValues: {
      name: teacherDetails ? teacherDetails?.name : "",
      qualification: teacherDetails ? teacherDetails?.qualification : "",
      courses: "",
      email: teacherDetails ? teacherDetails?.email : "",
    },

    onSubmit: async (values) => {
      try {
        const teacher = {
          name: values.name,
          qualification: values.qualification,
          courses: selectedCourseDetails,
          email: values.email,
          password: values.email,
          teacherId: teacherDetails.teacherId,
        };
        await assignCourses(teacher);
        formik.resetForm();
        setEnqueueSnackbar("Course assigned Succesfully", "success");
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
      {teacherDetails && (
        <DialogBox
          title={"Assign Course"}
          open={openAssignCourse}
          setOpen={closeDialog}
          maxWidth="lg"
          height="900px"
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
                            id="name"
                            name="name"
                            label="Teacher Name"
                            placeholder="Enter Teacher Name"
                            onChange={(value) =>
                              formik.setFieldValue("name", value)
                            }
                            value={formik.values.name}
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
                            id="qualification"
                            name="qualification"
                            label="Qualifications"
                            placeholder="Enter Qualifications"
                            onChange={(value) =>
                              formik.setFieldValue("qualification", value)
                            }
                            value={formik.values.qualification}
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
