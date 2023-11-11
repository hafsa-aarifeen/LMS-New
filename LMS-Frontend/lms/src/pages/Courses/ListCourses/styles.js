import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
  gridContainer: {
    flexDirection: "column",
    flexWrap: "nowrap",
    paddingTop: "20px",
    backgroundColor: "#FFFFFF",
    padding: "30px",
  },
  plusIcon: {
    width: "30px",
    height: "30px",
    color: "White",
    paddingRight: "2px",
  },
  topCards: {
    margin: `1% 0`,
  },
  section: {
    paddingTop: "10px",
    height: "100%",
    paddingBottom: "30px",
  },
  assignBtn: {
    flexDirection: "row-reverse",
  },

  menuIconRoot: {
    width: "16px",
    height: "16px",
    color: "#808CA3",
    marginRight: "15px",
  },
  editIconRoot: {
    marginRight: "15px",
  },
  btnRoot: {
    "&:hover": {
      backgroundColor: "transparent !important",
    },
    textTransform: "none",
    color: "#808CA3",
    padding: 0,
    fontFamily: "Ubuntu",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    minWidth: "50px",
    height: "26px",
  },
  deleteBtn: {
    "&:hover": {
      backgroundColor: "transparent !important",
    },
    textTransform: "none",
    color: "#FF7C7C",
    padding: 0,
    fontFamily: "Ubuntu",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    minWidth: "50px",
    height: "26px",
  },
  divider: {
    margin: "0px 30px",
    "@media (max-width: 1330px)": {
      margin: "0px 0px",
    },
    textAlign: "right",
  },
  spinner: {
    width: "100%",
    height: "100%",
    marginTop: "10%",
  },
  btnText: {
    "@media (max-width: 1330px)": {
      display: "none",
    },
  },
  btn: {
    minwidth: "8.3125em",
  },
  link: {
    textDecoration: "none",
  },
  totalAmount: {
    background: "#DFEAFF",
    color: "#0F5EF7",
    fontWeight: "bold",
    fontSize: "1.563rem",
    lineHeight: "34px",
    padding: "0.625em",
    width: "10%",
    height: "60%",
    marginTop: "1.7%",
    borderRadius: "8px",
    fontFamily: "Ubuntu",
    fontStyle: "normal",
    textAlign: "center",
    marginLeft: "40%",
  },
}));
