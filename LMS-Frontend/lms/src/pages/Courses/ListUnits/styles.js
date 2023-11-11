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
  container: {
    flexDirection: "row",
    flexWrap: "nowrap",
    padding: "0em 3.5625em",
    display: "flex",
    width: "100%",
    margin: "0",
    overflow: "hidden",
    justifyContent: "space-between",
    "@media (max-width: 1330px)": {
      padding: "0em",
    },
  },
  heading: {
    paddingTop: "29px",
  },
  section: {
    paddingTop: "20px",
    flex: 1,
  },
  buttonSection: {
    paddingTop: "40px",
    flex: 1,
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {},
  },
  textField: {
    flex: 1,
    border: "1px black",
  },
  errorTextField: {
    borderColor: "red !important",
  },
  block: {
    display: "flex",
    flexDirection: "row-reverse",
    paddingTop: "70px",
  },
  button: {
    width: "166px",
    height: "40px",
    marginBottom: "50px",
  },
  itemNameButton: {
    width: "100%",
    height: "50px",
  },
  backButton: {
    width: "166px",
    height: "40px",
    marginBottom: "50px",
    marginRight: "20px",
  },
  invalid: {
    color: "red",
    fontSize: "0.75rem",
  },
  tags: {
    paddingTop: "10px",
  },
  required: {
    color: "red",
  },
  displayButton: {
    width: "100%",
    height: "50px",
    backgroundColor: "#ff9200",
  },
  listTable: {
    paddingTop: "40px",
  },
  label: {
    color: "rgba(0, 24, 71, 1)",
    fontFamily: "Ubuntu",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "0.875rem",
    paddingBottom: "14px",
  },
}));
