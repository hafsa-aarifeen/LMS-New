import React, { forwardRef, useRef } from "react";
import ReactToPrint from "react-to-print";

import Grid from "@material-ui/core/Grid";
import { Button } from "@mui/material";

import PrintableTable from "../../components/PrintableTable";
import DialogBox from "../../components/DialogBox";

import uok from "../../../src/uok.png";

import { styles } from "./Styles";
import { Typography } from "@material-ui/core";

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
    Header: "Total Lectures",
    accessor: "totalNumberOfLectures",
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

export const StudentReport = forwardRef(
  ({
    setOpenPrintPreview,
    openPrintPreview,
    coursesList,
    persontageTable,
    studentData,
  }) => {
    const classes = styles();

    const componentRef = useRef();

    // const { data: invoiceData } = useInvoiceByInvoiceNo({
    //   invoiceNo: invoiceNo,
    // });

    // let no = 0;
    // invoiceData?.forEach((element) => {
    //   element.item = `${element.itemName} ${element.itemColor}`;
    //   no = no + 1;
    //   element.no = no;
    // });

    // const filteredObject = invoiceData?.filter(
    //   (obj) => obj.invoiceNo == invoiceNo
    // )[0];

    const handlePrint = () => {
      return <Button variant="contained"> Print This</Button>;
    };

    return (
      <>
        <DialogBox
          title={"Print Invoice"}
          open={openPrintPreview}
          setOpen={setOpenPrintPreview}
          maxWidth="lg"
          height="1200px"
          children={
            <>
              <div ref={componentRef} className={classes.body}>
                <Grid container classes={{ container: classes.gridContainer }}>
                  <Grid
                    item
                    container
                    spacing={2}
                    justifyContent="space-between"
                  >
                    {/* <Grid item xs={12}>
                      <img
                        src={uok}
                        alt="react logo"
                        className={classes.image}
                      />
                    </Grid> */}

                    <Grid item xs={12} className={classes.heading}>
                      Student Report
                    </Grid>

                    <Grid item>
                      <Grid>
                        <Typography variant="h6" component="h2">
                          Student Name : {studentData?.studentName}{" "}
                        </Typography>{" "}
                      </Grid>
                      <Grid>
                        <Typography variant="h6" component="h2">
                          Student Email : {studentData?.email}{" "}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography variant="h6" component="h2">
                          Student Id : {studentData?.studentId}{" "}
                        </Typography>
                      </Grid>
                      {/* <Grid>
                          Date  {filteredObject?.invoiceDate}
                        </Grid> */}
                      {/* <Grid>PO No : {filteredObject?.po}</Grid> */}
                      {/* <Grid>Invoice No : R / PO / {invoiceNo} </Grid> */}
                      {/* <Grid>PO Date : {filteredObject?.poDate}</Grid> */}
                    </Grid>
                  </Grid>
                  <Grid className={classes.tableHeading}>Attendance Sheet</Grid>
                  <Grid item xs={12}>
                    {persontageTable && columns && (
                      <PrintableTable
                        columns={columns}
                        data={persontageTable}
                        hiddenColumns={["id"]}
                        fontSize="24px"
                        color="#FFFFFF"
                      />
                    )}
                  </Grid>
                  {/* <Grid item className={classes.totalAmount}>
                    Total :{" "}
                    {amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Grid> */}
                  {/* <Grid item xs={5} className={classes.signature}>
                    <Grid>---------------------------------</Grid>
                    <Grid>Manager,</Grid>
                    <Grid>Fujicraft Electrical Accessories</Grid>
                  </Grid> */}
                </Grid>
              </div>
              <Grid item container className={classes.block}>
                <ReactToPrint
                  trigger={() => handlePrint()}
                  content={() => componentRef.current}
                />
              </Grid>
            </>
          }
        />
      </>
    );
  }
);
