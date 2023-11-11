import React, { useEffect, useState } from "react";

import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import { Button, FormControl } from "@mui/material";

import { useSnackbar } from "notistack";

import { styles } from "./styles";

import DialogBox from "../../../components/DialogBox";
import LabeledTextField from "../../../components/LabeledTextField";

import Units from "./Units";

import useCreateCourse from "../../../hooks/services/useCreateCourse";

import { AddCircleOutline } from "@mui/icons-material";

const ManageCourse = ({ setOpenCreateCourse, openCreateCourse }) => {
  const classes = styles();

  const [openAddUnits, setOpenAddUnits] = useState(false);
  const [units, setUnits] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [file, setFile] = useState(null);
  const [fileDetails, setFileDetails] = useState([]);
  const [selectedFile, setSelectedFiel] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };

  const { mutateAsync: createCourse } = useCreateCourse();

  const formik = useFormik({
    initialValues: {
      courseName: "",
      courseDescription: "",
      grade: "",
      courseId: "",
      lecturerName: "",
      unitName: "",
      fileName: "",
      filePath: "",
      fileSize: "",
    },

    onSubmit: async (values) => {
      try {
        const data = {
          courseName: formik.values.courseName,
          courseDescription: formik.values.courseDescription,
          grade: formik.values.grade,
          courseId: formik.values.courseId,
          units: units,
        };
        await createCourse(data);
        setUnits([]);
        formik.resetForm();
        setSelectedFiel([]);
        setEnqueueSnackbar("Course Added Succesfully", "success");
      } catch (e) {
        setEnqueueSnackbar("Error Occured during Course Submission", "error");
      }
    },
  });
  const closeDialog = () => {
    setOpenCreateCourse(false);
  };

  const handleOpenUnits = () => {
    setOpenAddUnits(true);
  };

  const handleAddUnits = () => {
    const values = formik.values;
    const obj = {
      unitName: values.unitName,
      pdfFile: selectedFile,
    };
    setUnits([...units, obj]);

    formik.setFieldValue("units", "");
    setSelectedFiel([]);
  };

  const handleAddFiles = () => {
    const obj = {
      id: fileDetails.id,
      filePath: fileDetails.filePath,
      fileName: fileDetails.fileName,
      fileSize: fileDetails.fileSize,
      courseId: fileDetails.courseId,
      unitName: fileDetails.unitName,
    };
    setSelectedFiel([...selectedFile, obj]);
  };

  return (
    <>
      <DialogBox
        title={"Create Course"}
        open={openCreateCourse}
        setOpen={closeDialog}
        maxWidth="lg"
        height="1050px"
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
                          id="courseName"
                          name="courseName"
                          label="Course Name"
                          placeholder="Enter Course Name"
                          onChange={(value) =>
                            formik.setFieldValue("courseName", value)
                          }
                          value={formik.values.courseName}
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
                          id="courseId"
                          name="courseId"
                          label="Course Id"
                          placeholder="Enter Course Id"
                          onChange={(value) =>
                            formik.setFieldValue("courseId", value)
                          }
                          value={formik.values.courseId}
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
                          id="courseDescription"
                          name="courseDescription"
                          label="Description"
                          placeholder="Enter Description"
                          onChange={(value) =>
                            formik.setFieldValue("courseDescription", value)
                          }
                          value={formik.values.courseDescription}
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
                          id="grade"
                          name="grade"
                          label="Grade"
                          placeholder="Enter Grade"
                          onChange={(value) =>
                            formik.setFieldValue("grade", value)
                          }
                          value={formik.values.grade}
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
                          id="lecturerName"
                          name="lecturerName"
                          label="Lecturer Name"
                          placeholder="Enter Lecturer Name"
                          onChange={(value) =>
                            formik.setFieldValue("lecturerName", value)
                          }
                          value={formik.values.lecturerName}
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
                        onClick={handleOpenUnits}
                        className={classes.itemNameButton}
                      >
                        <AddCircleOutline className={classes.plusIcon} />
                        {"Add Units"}
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
            <Units
              openAddUnits={openAddUnits}
              setOpenAddUnits={setOpenAddUnits}
              handleAddUnits={handleAddUnits}
              handleAddFiles={handleAddFiles}
              formik={formik}
              classes={classes}
              units={units}
              setFile={setFile}
              file={file}
              setFileDetails={setFileDetails}
              fileDetails={fileDetails}
            ></Units>
          </Grid>
        }
      />
    </>
  );
};
export default ManageCourse;
