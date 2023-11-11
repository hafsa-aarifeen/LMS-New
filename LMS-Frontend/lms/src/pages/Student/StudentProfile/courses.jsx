import React, { useState } from "react";

import { Grid } from "@mui/material";
import FormControl from "@material-ui/core/FormControl";

import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import LazyLoadingTable from "../../../components/LazyLoadingTable";
import DialogBox from "../../../components/DialogBox";
import LabeledTextField from "../../../components/LabeledTextField";

const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Courses",
    accessor: "courses",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
];

const Courses = ({
  openAddCourse,
  setOpenAddCourse,
  handleAddCourse,
  classes,
  formik,
  coursesList,
  courses,
}) => {
  const selectedCourses = courses?.map((element) => {
    const obj = {
      courses: element.courseName,
    };
    return obj;
  });

  return (
    <DialogBox
      title={"Add Courses"}
      saveButtonTitle={"Add Course"}
      open={openAddCourse}
      setOpen={setOpenAddCourse}
      maxWidth="sm"
      // updatingStatus={isUpdating}
      // disableStatus={isUpdating || !selectedList.length}
      handleSaveButton={handleAddCourse}
      children={
        <Grid>
          <Grid sx={classes.textField}>
            <Grid item container className={classes.section} spacing={3}>
              <Grid item className={classes.textField}>
                <Grid item>
                  <FormControl fullWidth>
                    <LabelledEditableSelect
                      id="courses"
                      name="courses"
                      label="Course"
                      placeholder="Enter Course"
                      onChange={(value) =>
                        formik.setFieldValue("courses", value)
                      }
                      value={formik.values.courses}
                      items={coursesList}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {selectedCourses && selectedCourses.length > 0 && (
            <Grid item className={classes.listTable} xs={12}>
              <LazyLoadingTable
                columns={columns}
                data={selectedCourses}
                hiddenColumns={["id"]}
                maxHeightInRows={10}
                onClickTableRow={(index, row) => {
                  console.log(index, row);
                }}
              />
            </Grid>
          )}
        </Grid>
      }
    />
  );
};
export default Courses;
