import React from "react";

import Chip from "@mui/material/Chip";

import { useTheme } from "@mui/material/styles";
import styles from "./style";

const StatusChip = (props) => {
  const theme = useTheme();
  const classes = styles(theme, props);

  return (
    <Chip
      variant="outlined"
      label={props.label}
      sx={[classes.chip, classes.contentText]}
    />
  );
};

export default StatusChip;
