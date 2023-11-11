import React, { useState } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import LogPanel from "./LogPanel";
import CodeRenderer from "./CodeRenderer";
import styles from "./styles";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const LogsDisplay = ({ taskRuns }) => {
  const theme = useTheme();
  const classes = styles(theme);
  const matches = useMediaQuery("(max-width:1330px)");
  const matches2 = useMediaQuery("(max-width:1660px)");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid item container spacing={2}>
        <Grid item xs={matches ? 4 : matches2 ? 3 : 2}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs"
            TabIndicatorProps={{ style: { borderLeft: "6px solid #0F5EF7" } }}
          >
            {taskRuns.map(({ id, Icon, taskName }, index) => (
              <Tab
                label={
                  <Grid item container justifyContent="space-between">
                    <Grid item xs={9} sx={classes.stepText}>
                      {taskName}
                    </Grid>
                    <Grid item xs={2} sx={classes.tabIcon}>
                      {Icon}
                    </Grid>
                  </Grid>
                }
                {...a11yProps(index)}
                sx={classes.tab}
                key={id}
              />
            ))}
          </Tabs>
        </Grid>

        <Grid item xs={matches ? 8 : matches2 ? 9 : 10}>
          {taskRuns?.map(({ id, steps }, index) => (
            <LogPanel value={value} index={index} key={id}>
              <Grid sx={classes.stagesBox} key={index}>
                {steps &&
                  steps.map(({ name, logEntry }) => (
                    <Grid key={name}>
                      <Grid sx={classes.text}>{name}</Grid>
                      <Divider variant="fullWidth" />
                      <CodeRenderer
                        logEntry={logEntry}
                        language={"bash"}
                        showLineNumbers={true}
                        wrapLongLines={true}
                      />
                    </Grid>
                  ))}
              </Grid>
            </LogPanel>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default LogsDisplay;
