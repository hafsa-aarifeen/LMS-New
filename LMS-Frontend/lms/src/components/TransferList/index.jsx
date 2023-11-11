import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import ListItems from "./ListItems";
import LabelledSelect from "../LabelledSelect";
import { not, intersection, union } from "./helpers";
import styles from "./styles";

const TransferList = ({
  titleAll, //title of choices
  titleSelected, //title of choiced
  /**
   * array of allList and selectedList to render as select options
   * ex: [
   *       { "id": 1, "name": "item 1" },
   *       { "id": 2, "name": "google" }
   *    ]
   */
  allList, //choices
  setAllList, // set all list
  allSelectCheck, // if true all select checkbox appear
  selectedList, //selected list
  setSelectedList, //set selected list
  disabledList,
  dropDownButtonText,
  menuItemArray,
  dropDownFilter,
  handleChangeDropDown,
  ...customFilterProps
}) => {
  const theme = useTheme();
  const classes = styles(theme);
  const breakpoint = useMediaQuery("(max-width:1080px)");

  //Local states
  const [checked, setChecked] = useState([]);

  //utility functions
  const leftChecked = intersection(checked, allList);
  const rightChecked = intersection(checked, selectedList);
  const numberOfChecked = (items) => intersection(checked, items).length;

  //Event handlers
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setSelectedList(selectedList.concat(leftChecked));
    setAllList(not(allList, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setAllList(allList.concat(rightChecked));
    setSelectedList(not(selectedList, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      {dropDownButtonText && (
        <Grid
          container
          justifyContent="left"
          alignItems="center"
          sx={classes.labelledSelect}
        >
          <Grid item xs={5}>
            <LabelledSelect
              items={menuItemArray}
              label={dropDownButtonText}
              onChange={handleChangeDropDown}
              {...customFilterProps}
            />
          </Grid>
        </Grid>
      )}
      <Grid item xs={5}>
        <ListItems
          title={titleAll}
          items={allList}
          handleToggle={handleToggle}
          handleToggleAll={handleToggleAll}
          numberOfChecked={numberOfChecked}
          checked={checked}
          allSelectCheck={allSelectCheck}
        />
      </Grid>
      <Grid item xs={2}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Button
              sx={[
                classes.transferButtons,
                { my: 0.5 },
                breakpoint ? classes.buttonSm : null,
              ]}
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected selectedList"
            >
              {breakpoint ? ">>" : "Add"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={[
                classes.removeButton,
                classes.transferButtons,
                { my: 0.5 },
                breakpoint ? classes.buttonSm : null,
              ]}
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              {breakpoint ? "<<" : "Remove"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <ListItems
          title={titleSelected}
          items={selectedList}
          handleToggle={handleToggle}
          handleToggleAll={handleToggleAll}
          numberOfChecked={numberOfChecked}
          checked={checked}
          allSelectCheck={allSelectCheck}
          disabledList={disabledList}
        />
      </Grid>
    </Grid>
  );
};

export default TransferList;
