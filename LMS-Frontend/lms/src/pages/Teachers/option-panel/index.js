import React, { useState } from "react";

import { Grid, Button, Divider, Box } from "@mui/material";

import EditIcon from "../../../components/EditIcon";
import DeleteIcon from "../../../components/DeleteIcon";

import useDeleteTeacher from "../../../hooks/services/useDeleteTeacher";

import { styles } from "../ListTeachers/styles";

const OptionPanel = ({ values, deleted, setDeleted }) => {
  const mutation = useDeleteTeacher({ id: values.id });
  const classes = styles();
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteMutation = useDeleteTeacher({ id: values?.id });

  const handleDelete = async () => {
    if (isDeleting) {
      return; // If delete operation is already in progress, prevent further calls
    }

    try {
      setIsDeleting(true); // Set the flag to true to indicate delete operation in progress
      await deleteMutation.mutateAsync({});
      console.log("Delete successful");

      // Call the get endpoint after the delete is successful
      setDeleted(!deleted);
    } catch (error) {
      console.error("Error during delete:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "fit-content",
        }}
      >
        {/* <Button
          id="btn-edit-credential"
          onClick={(e) => {
            handleCourses(values);
            e.stopPropagation();
          }}
          variant="text"
          classes={classes.btnRoot}
          startIcon={
            <EditIcon color="#808CA3" className={classes.editIconRoot} />
          }
        >
          <span className={classes.btnText}>Add Courses</span>
        </Button> */}
        {/* <Divider orientation="vertical" flexItem className={classes.divider} /> */}
        <Button
          id="btn-delete-credential"
          variant="text"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          classes={classes.deleteBtn}
          startIcon={<DeleteIcon className={classes.menuIconRoot} />}
        >
          <span className={classes.btnText}>Delete</span>
        </Button>
      </Box>
    </Grid>
  );
};

export default OptionPanel;
