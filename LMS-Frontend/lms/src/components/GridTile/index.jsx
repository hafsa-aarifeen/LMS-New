import React from "react";

import Grid from "@mui/material/Grid";
import { useTheme } from "@emotion/react";

import LabelledChip from "../LabelledChip";
import styles from "./style";

const GridTile = ({
  icon,
  buttonPanel,
  title,
  subTitle,
  tags,
  childComponent,
  handleClick,
  customProps,
}) => {
  const theme = useTheme();
  const classes = styles(theme);

  return (
    <Grid
      container
      sx={classes.container}
      onClick={handleClick}
      style={customProps?.cardRoot}
    >
      <Grid item container justifyContent="space-between">
        <Grid item style={customProps?.cardIcon}>
          {icon}
        </Grid>
        <Grid item style={customProps?.cardButtonPanel}>
          {buttonPanel}
        </Grid>
      </Grid>
      <Grid item sx={classes.title} style={customProps?.cardTitle}>
        {title}
      </Grid>
      {subTitle && (
        <Grid
          item
          xs={12}
          sx={classes.subTitleInfoTopic}
          style={customProps?.cardSubTitle}
        >
          {subTitle}
        </Grid>
      )}
      <Grid
        item
        container
        sx={classes.tagGridConainer}
        style={customProps?.cardTags}
      >
        <Grid item sx={classes.tagGrid}>
          {tags?.length > 0 &&
            tags.map((tag, index) => (
              <LabelledChip key={index} height="20px" label={tag} />
            ))}
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        {childComponent}
      </Grid>
    </Grid>
  );
};

export default GridTile;
