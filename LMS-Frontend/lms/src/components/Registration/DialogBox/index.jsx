import React, { useState } from "react";

import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import DialogBox from "../../../components/DialogBox";

const RegistrationDialogBox = ({ classes }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickTeacher = () => {
    navigate("/lms/teacherRegistration");
  };

  const handleClickStudent = () => {
    navigate("/lms/studentRegistration");
  };
  return (
    <DialogBox
      title={"Select Role"}
      saveButtonTitle={"Select"}
      open={open}
      setOpen={handleClose}
      maxWidth="sm"
      //   handleSaveButton={handleAddCourse}
      children={
        <Grid>
          <Box
            component={"div"}
            // sx={classes.assessmentOutlinedIcon}
            onClick={handleClickTeacher}
          >
            {/* <EnvTemplateIcon width={130} height={90} /> */}
            Teacher
          </Box>
          <Box
            component={"div"}
            // sx={classes.assessmentOutlinedIcon}
            onClick={handleClickStudent}
          >
            {/* <EnvTemplateIcon width={130} height={90} /> */}
            Student
          </Box>
        </Grid>
      }
    />
  );
};
export default RegistrationDialogBox;
