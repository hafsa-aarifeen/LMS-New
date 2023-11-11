import React, { useState, useEffect } from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

import {
  Typography,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

import styles from "./styles";

const DynamicLabelledSelect = ({
  label,
  placeholder,
  /**
   * array of items to render as select options
   * ex: [
   *       { "name": "facebook", "value": "http://facobook.com" },
   *       { "name": "google", "value": "http://google.com" }
   *    ]
   */
  items,
  required,
  value,
  onChange,
  isNextPageLoading,
  hasNextPage,
  loadMore,
  errorMsg, // this error message will come from the Form element
  customProps, // all the customizations needed for this element will go inside this object
  ...rest
}) => {
  // Constants
  const DEFAULT_HEIGHT = 150;
  const DEFAULT_PAPER_HEIGHT = 500;
  const DEFAULT_ITEM_SIZE = 35;

  // Styles
  const theme = useTheme();
  const classes = styles(theme);

  // Local states
  const [newValue, setNewValue] = useState(value);
  const [open, setOpen] = useState(false);

  // To change value after initialization
  useEffect(() => {
    setNewValue(value);
  }, [value]);

  // Utility functions
  const loadMoreItems = isNextPageLoading ? () => {} : loadMore;
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const isItemLoaded = ({ index }) => !hasNextPage || index < items.length;
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  // Event handlers
  const handleChange = (data) => {
    setNewValue(data?.name);
    onChange(data);
    setOpen(false);
  };

  const totalHeight = DEFAULT_ITEM_SIZE * items.length;
  const LIST_HEIGHT =
    totalHeight > DEFAULT_HEIGHT ? DEFAULT_HEIGHT : totalHeight;

  // Child elements
  const MenuItems = (
    <AutoSizer disableHeight>
      {({ width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList
              height={customProps?.height ? customProps.height : LIST_HEIGHT}
              width={width}
              itemCount={items.length}
              itemSize={
                customProps?.itemSize ? customProps.itemSize : DEFAULT_ITEM_SIZE
              }
              itemData={items}
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {({ data, index, style }) => (
                <MenuItem
                  key={index}
                  value={
                    data[index].value ? data[index].value : data[index].name
                  }
                  style={style}
                  onClick={() => handleChange(data[index])}
                >
                  {data[index].name}
                </MenuItem>
              )}
            </FixedSizeList>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );

  return (
    <Grid sx={classes.container}>
      {label && (
        <Grid sx={classes.label}>
          {label}
          {required && (
            <Box component={"span"} sx={classes.error}>
              {" "}
              *
            </Box>
          )}
        </Grid>
      )}
      <FormControl variant="outlined" error={errorMsg ? true : false}>
        <Select
          sx={classes.select}
          value={newValue}
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          displayEmpty
          renderValue={() => {
            if (!newValue) {
              return <Typography color="#a9a9a9">{placeholder}</Typography>;
            }
            return newValue;
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            PaperProps: {
              style: {
                maxHeight: customProps?.paperHeight
                  ? customProps.paperHeight
                  : DEFAULT_PAPER_HEIGHT,
              },
            },
          }}
          {...rest}
        >
          {MenuItems}
        </Select>
        <FormHelperText>{errorMsg}</FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default DynamicLabelledSelect;
