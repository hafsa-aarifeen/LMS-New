import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  separator: {
    width: "100%",
    height: "1px",
    backgroundColor: "#ccc", // Change the color as needed
    margin: "10px 0", // Adjust the margin as needed
  },
}));

const SeparatorLine = () => {
  const classes = useStyles();

  return <div className={classes.separator} />;
};

export default SeparatorLine;
