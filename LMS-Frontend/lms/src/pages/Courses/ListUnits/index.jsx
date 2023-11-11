import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useSnackbar } from "notistack";

import { useFormik } from "formik";

import useCreateCourse from "../../../hooks/services/useCreateCourse.js";

import { AppContext } from "../../../components/AppContext.js";

import { Grid, Button } from "@mui/material";

import PageLayout from "../../../components/PageLayout/index.jsx";

import Units from "../ManageCourse/Units/index.jsx";

import useGetCourse from "../../../hooks/services/useGetCourse";
import UseDownloadFile from "../../../hooks/services/useDownloadFile.js";

import { styles } from "./styles.js";

import { ROLE } from "../../../constants.js";

import TemplateTypeTile from "../../../components/TemplateTypeTile/index.jsx";

import LocalLibrarySharpIcon from "@mui/icons-material/LocalLibrarySharp";
import { IMAGES } from "../../../images.js";

const ListUnits = () => {
  const classes = styles();
  const { id } = useParams();
  const location = useLocation();
  const [openAddUnits, setOpenAddUnits] = useState();
  const [units, setUnits] = useState([]);
  const [selectedFile, setSelectedFiel] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [fileDetails, setFileDetails] = useState([]);
  const [file, setFile] = useState(null);

  const { role } = useContext(AppContext);

  const { data: courseData } = useGetCourse({ courseId: id });
  const handleClick = (element) => {
    UseDownloadFile(element.filePath, element.fileName);
  };

  const courseDetails = courseData && courseData[0];

  courseData?.map((element) => {
    IMAGES?.forEach((imgs) => {
      element.img = imgs;
    });
  });

  const { mutateAsync: createCourse } = useCreateCourse();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };
  const formik = useFormik({
    initialValues: {
      courseName: courseDetails?.courseName,
      courseDescription: courseDetails?.courseDescription,
      grade: courseDetails?.grade,
      courseId: courseDetails?.courseId,
      lecturerName: courseDetails?.lecturerName,
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
        setEnqueueSnackbar("Teacher Added Succesfully", "success");
      } catch (e) {
        setEnqueueSnackbar("Error Occured during Teacher Submission", "error");
      }
    },
  });

  const handleOpenUnits = () => {
    setOpenAddUnits(true);
  };

  const handleAddUnits = async () => {
    try {
      const data = {
        courseName: formik.values.courseName,
        courseDescription: formik.values.courseDescription,
        grade: formik.values.grade,
        courseId: id,
        units: units,
      };
      await createCourse(data);
      setUnits([]);
      formik.resetForm();
      setSelectedFiel([]);
      setEnqueueSnackbar("Unit Added Succesfully", "success");
    } catch (e) {
      setEnqueueSnackbar("Error Occured during unit creation", "error");
    }

    formik.setFieldValue("units", "");
    setSelectedFiel([]);
  };

  const handleAddFiles = () => {
    const obj = {
      id: fileDetails.id,
      filePath: fileDetails.filePath,
      fileName: fileDetails.fileName,
      fileSize: fileDetails.fileSize,
      courseId: id,
      unitName: fileDetails.unitName,
    };
    const values = formik.values;
    setSelectedFiel([...selectedFile, obj]);

    const unit = {
      unitName: values.unitName,
      pdfFile: [obj],
    };
    setUnits([...units, unit]);
  };

  return (
    <>
      <PageLayout
        pageHeading={`Units List : ${location.state.courseName}`}
        pageActions={
          role === ROLE.TEACHER && (
            <Grid>
              <Button
                id="btn-create-purchase-order"
                variant="contained"
                onClick={handleOpenUnits}
              >
                <LocalLibrarySharpIcon style={{ marginRight: "10px" }} />
                {"Add Units"}
              </Button>
            </Grid>
          )
        }
      >
        <Grid container spacing={2} className={classes.templateContainer}>
          {courseData?.map((element) => (
            <Grid item xs={2}>
              <TemplateTypeTile
                handleClick={() => handleClick(element)}
                height={"80%"}
                width={"100%"}
                templateTitle={element.unitName}
                textAlign={"center"}
                img={element.img}
              />
            </Grid>
          ))}
        </Grid>
      </PageLayout>
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
    </>
  );
};

export default ListUnits;
