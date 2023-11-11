import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../components/AppContext.js";
import { useNavigate } from "react-router-dom";
import OptionPanel from "../option-panel";
import { styles } from "./styles";

import { Button } from "@mui/material";
import { Grid } from "@material-ui/core";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";
import HowToRegSharpIcon from "@mui/icons-material/HowToRegSharp";

import LazyLoadingTable from "../../../components/LazyLoadingTable";
import PageLayout from "../../../components/PageLayout";
import StudentRegistration from "../../../components/Registration/Student";

import { ROLE } from "../../../constants.js";

import useGetRegisteredStudents from "../../../hooks/services/useGetRegisteredStudents";

const ListStudents = () => {
  const classes = styles();
  const navigate = useNavigate();
  const { role } = useContext(AppContext);
  const [deleted, setDeleted] = useState(false);

  const [openRegisterStudents, setOpenRegisterStudents] = useState(false);
  const handleViewProfile = (values) => {
    navigate(`/lms/student/profile/${values.studentId}`, {
      state: { name: values.studentName, studentId: values.studentId },
    });
  };

  const { data: registeredStudents } = useGetRegisteredStudents(deleted);

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
      Header: "StudentName",
      accessor: "studentName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Student Id",
      accessor: "studentId",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Email",
      accessor: "email",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Phone Number",
      accessor: "phonenumber",
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
        return (
          <OptionPanel
            values={values}
            deleted={deleted}
            setDeleted={setDeleted}
          />
        );
      },
    },
  ];

  const handleRegisterStudents = () => {
    setOpenRegisterStudents(true);
  };

  let no = 0;
  registeredStudents?.forEach((element) => {
    no = no + 1;
    element.no = no;
  });

  return (
    <>
      <Grid container classes={{ container: classes.gridContainer }}>
        <PageLayout
          pageHeading={"Students"}
          pageActions={
            role === ROLE.ADMIN && (
              <Grid>
                <Button
                  id="btn-registerStudent"
                  variant="contained"
                  onClick={handleRegisterStudents}
                >
                  <HowToRegSharpIcon styles={{ marginRight: "10px" }} />
                  {"Register Student"}
                </Button>
              </Grid>
            )
          }
        >
          {registeredStudents && registeredStudents.length > 0 && (
            <Grid item className={classes.listTable} xs={12}>
              <LazyLoadingTable
                columns={columns}
                data={registeredStudents}
                hiddenColumns={["id"]}
                maxHeightInRows={10}
                onClickTableRow={(index, row) => {
                  handleViewProfile(row);
                }}
              />
            </Grid>
          )}
        </PageLayout>
        <StudentRegistration
          openRegisterStudents={openRegisterStudents}
          setOpenRegisterStudents={setOpenRegisterStudents}
        />
      </Grid>
    </>
  );
};
export default ListStudents;
