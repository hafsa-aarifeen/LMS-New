import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../components/AppContext.js/index.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Button, Typography } from "@mui/material";
import { NoteAddRounded } from "@material-ui/icons";

import { css } from "@emotion/react";

import { ROLE } from "../../../constants.js";

import AssignCourses from "../AssignCourses/index.jsx";

import useGetStudentDetails from "../../../hooks/services/useGetStudentDetails.js";
import useGetStudentById from "../../../hooks/services/useGetStudentById.js";
import useGetAttendance from "../../../hooks/services/useGetAttendance.js";

import { styles } from "./styles.js";

import LabelledEditableSelect from "../../../components/LabelledEditableSelect/index.js";
import TemplateTypeTile from "../../../components/TemplateTypeTile/index.jsx";
import PageLayout from "../../../components/PageLayout/index.jsx";
import LazyLoadingTable from "../../../components/LazyLoadingTable/index.js";

import { StudentReport } from "../../ReportPrinter/StudentReport.js";

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
  },
  {
    Header: "Course Name",
    accessor: "courseName",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "courseId",
    accessor: "courseId",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "Attendance",
    accessor: "attendancePercentage",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    Cell: ({ value }) => (
      <>
        {value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </>
    ),
  },
];

const secondTable = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "date",
    accessor: "date",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
];

const StudentProfile = () => {
  const useStyles = (theme) => {
    const headingTitle = css`
      font-family: Ubuntu !important;
      font-weight: 600 !important;
      font-style: normal !important;
      line-height: 41px !important;
      font-weight: 500;
      font-size: 28px !important;
      line-height: 48px;
      color: Black;
    `;
    const subTitle = css`
      font-family: Ubuntu !important;
      font-weight: 500 !important;
      font-style: normal !important;
      line-height: 41px !important;
      font-weight: 300;
      font-size: 22px !important;
      line-height: 48px;
      color: Black;
    `;

    return {
      headingTitle,
      subTitle,
    };
  };

  const classes = styles();
  const headingStyles = useStyles();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { role } = useContext(AppContext);

  const [openAssignCourse, setOpenAssignCourse] = useState(false);
  const [openPrintPreview, setOpenPrintPreview] = useState();
  const [attendanceDateData, setAttendanceDateData] = useState();

  const { data: studentData } = useGetStudentDetails({
    studentId: id,
    courseId: "",
    courseName: "",
  });

  const { data: studentListById } = useGetStudentById({
    studentId: id,
  });

  const { data: allAttendanceData } = useGetAttendance({
    studentId: "",
    courseId: "",
  });

  const totalLectureCount = {};

  if (allAttendanceData) {
    for (const obj of allAttendanceData) {
      const key = obj.courseId;
      totalLectureCount[key] = (totalLectureCount[key] || 0) + 1;
    }
  }

  const { data: studentAttendanceData } = useGetAttendance({ studentId: id });

  useEffect(() => {
    if (Array.isArray(studentData) && Array.isArray(studentAttendanceData)) {
      const result = studentData?.map((element) => {
        const stdObj = studentAttendanceData
          .filter((std) => std.courseId === element.courseId)
          ?.map((std) => ({ dates: std.date }));

        const atdObj = {
          ...element,
          dateObj: stdObj.filter((obj) => obj !== null), // Remove null values from stdObj array
        };

        return atdObj;
      });
      setAttendanceDateData(result);
    }
  }, [studentData, studentAttendanceData]);

  const transformedData = attendanceDateData?.map((student) => {
    const dateObjects = student.dateObj?.map((date) => ({
      id: student.id,
      courseName: student.courseName,
      courseId: student.courseId,
      date: date.dates,
      attendancePercentage: student.attendancePercentage,
    }));

    return dateObjects;
  });

  transformedData?.forEach((element) => {
    console.log(element);
  });

  const studentAttendedDays = {};

  if (studentAttendanceData) {
    for (const obj of studentAttendanceData) {
      const key = obj.courseId;
      studentAttendedDays[key] = (studentAttendedDays[key] || 0) + 1;
    }
  }

  const result = {};

  for (const key of Object.keys(totalLectureCount)) {
    if (key in studentAttendedDays) {
      result[key] = {
        persontage: `${(
          (studentAttendedDays[key] / totalLectureCount[key]) *
          100
        ).toFixed(2)}%`,
        totalLectures: totalLectureCount[key],
      };
    }
  }

  const AttendanceSheet = studentData?.filter((obj) => obj.courseId in result);
  AttendanceSheet?.forEach((obj) => {
    obj.attendancePercentage = result[obj.courseId].persontage;
    obj.totalNumberOfLectures = result[obj.courseId].totalLectures;
  });

  const uniqueCourses = studentData?.reduce((acc, item) => {
    if (!acc.find((course) => course.courseId === item.courseId)) {
      acc.push(item);
    }
    return acc;
  }, []);

  const handleClick = (element) => {
    navigate(`/lms/courses/units/${element?.courseId}`, {
      state: { courseId: element.courseId, courseName: element.courseName },
    });
  };

  const handleAssignCourse = () => {
    setOpenAssignCourse(true);
  };

  let no = 0;
  AttendanceSheet?.forEach((element) => {
    no = no + 1;
    element.no = no;
  });

  const handleOpenPrintPreview = () => {
    setOpenPrintPreview(true);
  };

  return (
    <>
      <PageLayout
        pageHeading={"Student Profile"}
        pageActions={
          role === ROLE.ADMIN && (
            <Grid item container spacing={2} justifyContent="space-between">
              <Grid item>
                <Button
                  id="btn-assignCourses"
                  variant="contained"
                  onClick={handleAssignCourse}
                >
                  <NoteAddRounded className={classes.plusIcon} />
                  {"Assign Courses"}
                </Button>
              </Grid>{" "}
              <Grid item>
                <Button
                  id="btn-assignCourses"
                  variant="contained"
                  onClick={handleOpenPrintPreview}
                >
                  <NoteAddRounded className={classes.plusIcon} />
                  {"Print Student Report"}
                </Button>
              </Grid>
            </Grid>
          )
        }
      >
        <Grid container spacing={2} className={classes.topCards}>
          <Grid item xs={2} className={classes.section}>
            <LabelledEditableSelect
              label="Student Name"
              placeholder={location.state.name}
            />
          </Grid>
          <Grid item xs={2} className={classes.section}>
            <LabelledEditableSelect
              label="StudentId"
              placeholder={location.state.studentId}
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
              />
            </Grid>
          ))}
        </Grid>

        {AttendanceSheet &&
          AttendanceSheet.length > 0 &&
          transformedData &&
          transformedData.length > 0 && (
            <Grid item className={classes.listTable} xs={12}>
              <Typography sx={headingStyles.headingTitle}>
                Attendance Sheet
              </Typography>

              <LazyLoadingTable
                columns={columns}
                data={AttendanceSheet}
                hiddenColumns={["id"]}
                maxHeightInRows={10}
                onClickTableRow={(index, row) => {
                  console.log(index, row);
                }}
                height={300}
              />
            </Grid>
          )}

        <Typography sx={headingStyles.headingTitle}>Attended Days</Typography>
        <Grid item container spacing={2}>
          {transformedData &&
            transformedData.length > 0 &&
            transformedData?.map((element, index) => (
              <Grid item xs={4} className={classes.listTable} key={index}>
                <Typography sx={headingStyles.subTitle}>
                  Course Name : {element && element[0]?.courseName}
                </Typography>
                <LazyLoadingTable
                  columns={secondTable}
                  data={element}
                  hiddenColumns={["id"]}
                  maxHeightInRows={10}
                  onClickTableRow={(index, row) => {
                    console.log(index, row);
                  }}
                />
              </Grid>
            ))}
        </Grid>
      </PageLayout>
      {studentListById && (
        <AssignCourses
          openAssignCourse={openAssignCourse}
          setOpenAssignCourse={setOpenAssignCourse}
          studentDetails={studentListById}
        />
      )}
      {studentData && (
        <StudentReport
          openPrintPreview={openPrintPreview}
          setOpenPrintPreview={setOpenPrintPreview}
          persontageTable={AttendanceSheet}
          coursesList={uniqueCourses}
          studentData={studentData[0]}
        />
      )}
    </>
  );
};

export default StudentProfile;
