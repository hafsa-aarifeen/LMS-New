import * as React from "react";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";

import SearchBar from "./SearchBar";
import styles from "../styles";
const ListItems = ({
  title,
  /**
   * array of items to render as select options
   * ex: [
   *       { "id": 1, "name": "item1" },
   *       { "id": 2, "name": "item2" }
   *    ]
   */
  items,
  handleToggle,
  handleToggleAll,
  numberOfChecked,
  checked,
  allSelectCheck, // if true all select checkbox appear
  disabledList, // if want to show already chose list and no need to deselect
}) => {
  // Styles
  const theme = useTheme();
  const classes = styles(theme);

  //Local states
  const [searchAllText, setSearchAllText] = React.useState("");

  //Event handlers
  const filterList = (list, searchCriteria) => {
    if (searchCriteria === "") {
      return list;
    }

    let mySearchCriteria = searchCriteria.toLowerCase();
    return list.filter((user) =>
      user?.name?.toLowerCase().includes(mySearchCriteria)
    );
  };

  return (
    <Paper sx={classes.paper}>
      <Grid container>
        <Grid>
          {allSelectCheck && (
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleOutlineIcon />}
              indeterminateIcon={<RemoveCircleOutlineIcon />}
              onClick={handleToggleAll(items)}
              checked={
                numberOfChecked(items) === items.length && items.length !== 0
              }
              indeterminate={
                numberOfChecked(items) !== items.length &&
                numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{
                "aria-label": "all items selected",
              }}
            />
          )}
        </Grid>
        <Grid>
          <Grid sx={classes.title}>{title}</Grid>
          {allSelectCheck && (
            <Grid sx={classes.subHeader}>{`${numberOfChecked(items)}/${
              items.length
            } selected`}</Grid>
          )}
        </Grid>
      </Grid>
      <Divider />
      <Grid sx={classes.searchBar}>
        <SearchBar setSearchAllText={setSearchAllText} />
      </Grid>
      <List
        sx={{
          ...classes.list,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {disabledList &&
          disabledList.map((value) => {
            const labelId = `transfer-list-all-item-${value.name}-label`;
            return (
              <ListItem
                key={value?.id}
                role="listitem"
                onClick={handleToggle(value)}
                sx={classes.listItemText}
              >
                <ListItemText
                  id={labelId}
                  primary={
                    <Grid
                      item
                      container
                      sm={10}
                      spacing={1}
                      sx={classes.disabledList}
                    >
                      <Grid item>
                        <Avatar
                          style={{
                            width: "1em",
                            height: "1em",
                            color: "rgba(0, 0, 0, 0.54)",
                          }}
                          src={encodeURI(
                            "https://avatars.dicebear.com/api/initials/" +
                              `${value.name}` +
                              ".svg"
                          )}
                        />
                      </Grid>
                      <Grid item>
                        <Grid sx={classes.disabledText}>{value.name}</Grid>
                      </Grid>
                    </Grid>
                  }
                />
              </ListItem>
            );
          })}

        {filterList(items, searchAllText).map((value) => {
          const labelId = `transfer-list-all-item-${value.name}-label`;
          return (
            <ListItem
              key={value?.id}
              role="listitem"
              onClick={handleToggle(value)}
              sx={classes.listItemText}
              button
            >
              <ListItemIcon>
                <Checkbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleOutlineIcon />}
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={
                  <Grid item container spacing={1}>
                    <Grid item>
                      <Avatar
                        style={{ width: "1em", height: "1em" }}
                        src={encodeURI(
                          "https://avatars.dicebear.com/api/initials/" +
                            `${value.name}` +
                            ".svg"
                        )}
                      />
                    </Grid>
                    <Grid item>
                      <Grid sx={classes.text}>{value.name}</Grid>
                    </Grid>
                  </Grid>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default ListItems;
