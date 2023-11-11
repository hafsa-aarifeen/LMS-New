import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionPanel from "../option-panel";
import { styles } from "./styles";

import { Button } from "@mui/material";
import { Grid } from "@material-ui/core";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";

import LazyLoadingTable from "../../../components/LazyLoadingTable";
import PageLayout from "../../../components/PageLayout";
import TeacherRegistration from "../../../components/Registration/Teacher";

import useGetRegisteredTeachers from "../../../hooks/services/useGetRegisteredTeachers";

const ListTeachers = ({ teacherName }) => {
  const classes = styles();
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const [openRegisterTeacher, setOpenRegisterTeacher] = useState(false);
  const handleViewProfile = (values) => {
    navigate(`/lms/teachers/profile/${values.teacherId}`, {
      state: { name: values.name, qualification: values.qualification },
    });
  };

  const { data: registeredTeachers } = useGetRegisteredTeachers(deleted);

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
      Header: "TeacherName",
      accessor: "name",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Teacher Id",
      accessor: "teacherId",
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
      Header: "Qualification",
      accessor: "qualification",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Location",
      accessor: "location",
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
            setDeleted={setDeleted}
            deleted={deleted}
          />
        );
      },
    },
  ];

  const handleRegisterTeacher = () => {
    setOpenRegisterTeacher(true);
  };

  let no = 0;
  registeredTeachers?.forEach((element) => {
    no = no + 1;
    element.no = no;
  });

  return (
    <>
      <Grid container classes={{ container: classes.gridContainer }}>
        <PageLayout
          pageHeading={"Teachers"}
          pageActions={
            <Grid>
              <Button
                id="btn-registerTeacher"
                variant="contained"
                onClick={handleRegisterTeacher}
              >
                <NoteAddTwoToneIcon className={classes.plusIcon} />
                {"Register Teacher"}
              </Button>
            </Grid>
          }
        >
          {registeredTeachers && registeredTeachers.length > 0 && (
            <Grid item className={classes.listTable} xs={12}>
              <LazyLoadingTable
                columns={columns}
                data={registeredTeachers}
                hiddenColumns={["id"]}
                maxHeightInRows={10}
                onClickTableRow={(index, row) => {
                  handleViewProfile(row);
                }}
              />
            </Grid>
          )}
        </PageLayout>
        <TeacherRegistration
          openRegisterTeacher={openRegisterTeacher}
          setOpenRegisterTeacher={setOpenRegisterTeacher}
        />
      </Grid>
    </>
  );
};
export default ListTeachers;
