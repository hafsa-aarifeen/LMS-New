import React from "react";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Search as SearchIcon } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { useTheme } from "@mui/material/styles";

import styles from "../styles";

const SearchBar = ({ setSearchAllText }) => {
  const theme = useTheme();
  const classes = styles(theme);

  const handleInputChange = (event) => {
    setSearchAllText(event.target.value);
  };

  return (
    <Grid sx={classes.searchBar}>
      <TextField
        type="text"
        placeholder="Search"
        onChange={handleInputChange}
        fullWidth
        sx={classes.select}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        size="small"
      />
    </Grid>
  );
};

export default SearchBar;
