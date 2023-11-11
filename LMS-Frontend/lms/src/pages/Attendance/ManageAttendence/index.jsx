import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import { Button, FormControl } from "@mui/material";

import { Grid } from "@material-ui/core";

import { useSnackbar } from "notistack";

import { styles } from "./styles";

import DialogBox from "../../../components/DialogBox";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import CustomDatePicker from "../../../components/CustomDatePicker";
import TransferList from "../../../components/TransferList";

import { formatDate } from "./helper";

import useGetCourse from "../../../hooks/services/useGetCourse";
import useGetStudentDetails from "../../../hooks/services/useGetStudentDetails";
import useMarkAttendance from "../../../hooks/services/useMarkAttendance";

const MarkAttendance = ({ setOpenMarkAttendance, openMarkAttendance }) => {
  const classes = styles();

  const [date, setDate] = useState(new Date());

  const [allList, setAllList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [courseId, setCourseId] = useState();
  const [studentIds, setStudentIds] = useState([]);

  const { mutateAsync: markAttendance } = useMarkAttendance();

  const obj = selectedList.map((element) => {
    const test = {
      studentId: element.studentId,
    };
    return test;
  });

  const formik = useFormik({
    initialValues: {
      courseName: "",
    },

    onSubmit: async (values) => {
      try {
        const Attendance = {
          courseId: courseId,
          date: formatDate(date),
          students: obj,
        };
        await markAttendance(Attendance);
        setSelectedList([]);
        formik.resetForm();
        setEnqueueSnackbar("Attendance Marked Succesfully", "success");
      } catch (e) {
        setEnqueueSnackbar("Error occured while marking attendance", "error");
      }
    },
  });

  const { data: courseData } = useGetCourse({ courseId: "" });
  const { data: studentData } = useGetStudentDetails({
    courseName: formik.values.courseName,
  });
  const studentNameList = studentData?.map(
    ({ courseName, id, studentName, studentId }) => ({
      name: studentName,
      id: id,
      type: studentName,
      studentId: studentId,
    })
  );

  useEffect(() => {
    setAllList(studentNameList);
    setCourseId(studentData && studentData[0]?.courseId);
    setStudentIds(studentNameList?.map((obj) => obj.studentId));
  }, [studentData]);

  const coursesList = courseData?.map(({ id, courseName, courseId }) => ({
    name: courseName,
    value: courseName,
  }));

  const uniqueCourses = coursesList?.reduce((acc, item) => {
    if (!acc.find((course) => course.name === item.name)) {
      acc.push(item);
    }
    return acc;
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };

  const closeDialog = () => {
    setOpenMarkAttendance(false);
  };

  const handleDateSelect = (date) => {
    setDate(date);
  };

  return (
    <>
      <DialogBox
        title={"Mark Attendance"}
        open={openMarkAttendance}
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
                        <LabelledEditableSelect
                          id="courseName"
                          name="courseName"
                          label="Course Name"
                          placeholder="Enter Course Name"
                          onChange={(value) =>
                            formik.setFieldValue("courseName", value)
                          }
                          value={formik.values.courseName}
                          items={uniqueCourses}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid xs={12} item className={classes.textField}>
                  <Grid item>
                    <Grid>
                      <FormControl fullWidth>
                        <Grid className={classes.label}>SELECT DATE</Grid>
                        <CustomDatePicker
                          handleDateSelect={handleDateSelect}
                          date={date}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={12} item className={classes.textField}>
                  <Grid item>
                    <Grid>
                      {allList && (
                        <TransferList
                          titleAll={"All Students"}
                          titleSelected={"Selected Students"}
                          allList={allList}
                          setAllList={setAllList}
                          allSelectCheck={false}
                          setSelectedList={setSelectedList}
                          selectedList={selectedList}
                        />
                      )}
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
                    Mark Attendance
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        }
      />
    </>
  );
};
export default MarkAttendance;
