import React, { useState } from "react";

import { Grid, Typography } from "@mui/material";
import FormControl from "@material-ui/core/FormControl";

import { useLocation } from "react-router-dom";

import LabelledEditableSelect from "../../../../components/LabelledEditableSelect";
import LazyLoadingTable from "../../../../components/LazyLoadingTable";
import DialogBox from "../../../../components/DialogBox";
import FileUploaderComponent from "../../../../components/FileUploaderComponent";

import UseDownloadFile from "../../../../hooks/services/useDownloadFile";

import FileImport from "../../../../components/FileImport";

const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Unit Name",
    accessor: "unitName",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "FileName",
    accessor: "fileName",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
];

const Units = ({
  openAddUnits,
  setOpenAddUnits,
  handleAddUnits,
  handleAddFiles,
  classes,
  formik,
  unitsList,
  units,
  setFile,
  setFileDetails,
  fileDetails,
  file,
}) => {
  const flattenedUnits = units?.reduce((accum, curr) => {
    return [...accum, ...curr.pdfFile];
  }, []);

  return (
    <DialogBox
      title={"Add Units"}
      saveButtonTitle={"Add Unit"}
      open={openAddUnits}
      setOpen={setOpenAddUnits}
      maxWidth="sm"
      handleSaveButton={handleAddUnits}
      handleBackButton={handleAddFiles}
      backButtonTitle={"Add Files"}
      children={
        <Grid>
          <Grid className={classes.textField}>
            <Grid item container className={classes.section} spacing={3}>
              <Grid item className={classes.textField}>
                <Grid item>
                  <FormControl fullWidth>
                    <LabelledEditableSelect
                      id="unitName"
                      name="unitName"
                      label="Unit Name"
                      placeholder="Enter Unit Name"
                      onChange={(value) =>
                        formik.setFieldValue("unitName", value)
                      }
                      value={formik.values.unitName}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.textField}>
            <Grid item container className={classes.section} spacing={3}>
              <Grid item className={classes.textField}>
                <Grid item>
                  <FileUploaderComponent
                    setFile={setFile}
                    file={file}
                    courseId={formik.values.courseId}
                    unitName={formik.values.unitName}
                    fileDetails={fileDetails}
                    setFileDetails={setFileDetails}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {flattenedUnits && flattenedUnits.length > 0 && (
            <Grid item className={classes.listTable} xs={12}>
              <LazyLoadingTable
                columns={columns}
                data={flattenedUnits}
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
export default Units;
