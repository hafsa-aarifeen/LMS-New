import React, { useState, useContext } from "react";
import { AppContext } from "../../../components/AppContext.js";
import OptionPanel from "../option-panel";
import { styles } from "./styles";

import { Button } from "@mui/material";
import { Grid } from "@material-ui/core";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";

import PageLayout from "../../../components/PageLayout";

import ManageCourse from "../ManageCourse";

import { ROLE } from "../../../constants";

import useGetCourse from "../../../hooks/services/useGetCourse";

import TemplateTypeTile from "../../../components/TemplateTypeTile";

import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../../images.js";

const ListCourses = ({}) => {
  const classes = styles();
  const navigate = useNavigate();
  const [openCreateCourse, setOpenCreateCourse] = useState(false);
  const [courseName, setCourseName] = useState();

  const { role } = useContext(AppContext);

  const { data: courseData } = useGetCourse({ courseName: courseName });
  const uniqueCourses = courseData?.reduce((acc, item) => {
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

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "No",
      accessor: "no",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "5%",
    },
    {
      Header: "Course Name",
      accessor: "courseName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Course Id",
      accessor: "courseId",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Description",
      accessor: "courseDescription",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Lecturer",
      accessor: "lecturerName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      width: "13%",
      Cell: ({
        cell: {
          row: { values },
        },
      }) => {
        return <OptionPanel values={values} />;
      },
    },
  ];

  const handleCreateCourse = () => {
    setOpenCreateCourse(true);
  };

  const handleListUnits = (element) => {
    navigate(`/lms/courses/units/${element?.courseId}`, {
      state: { courseId: element.courseId, courseName: element.courseName },
    });
  };

  return (
    <>
      <Grid container classes={{ container: classes.gridContainer }}>
        <PageLayout
          pageHeading={"Courses"}
          pageActions={
            role === ROLE.ADMIN && (
              <Grid>
                <Button
                  id="btn-create-purchase-order"
                  variant="contained"
                  onClick={handleCreateCourse}
                >
                  <NoteAddTwoToneIcon className={classes.plusIcon} />
                  {"Create course"}
                </Button>
              </Grid>
            )
          }
        >
          <Grid item container justifyContent={"space-between"}>
            <Grid item className={classes.homePage} xs={12}>
              <Grid container spacing={5} className={classes.templateContainer}>
                {uniqueCourses?.map((element, index) => (
                  <Grid item xs={4}>
                    <TemplateTypeTile
                      handleClick={() => handleListUnits(element)}
                      height={"80%"}
                      width={"100%"}
                      templateTitle={element.courseName}
                      templateDescription={element.courseDescription}
                      img={element.img}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </PageLayout>

        <ManageCourse
          openCreateCourse={openCreateCourse}
          setOpenCreateCourse={setOpenCreateCourse}
        />
      </Grid>
    </>
  );
};
export default ListCourses;
