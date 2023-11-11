import React from "react";

import Box from "@mui/material/Box";

const LogPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ padding: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default LogPanel;
