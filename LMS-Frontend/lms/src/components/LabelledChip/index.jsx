import React from "react";

import Chip from "@mui/material/Chip";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import styles from "./style";

const LabelledChip = ({
  label,
  backgroundColor,
  infoIcon,
  title,
  disableHoverListenerAction,
  height,
}) => {
  const theme = useTheme();
  const classes = styles({ theme, backgroundColor, height });

  return (
    <Tooltip
      title={<h1 sx={classes.title}>{title} </h1>}
      placement="top"
      disableHoverListener={disableHoverListenerAction === false ? false : true}
      arrow
    >
      <Chip
        label={label}
        sx={classes.root}
        icon={
          infoIcon && <InfoIcon fontSize="small" style={{ color: "white" }} />
        }
      />
    </Tooltip>
  );
};

export default LabelledChip;
