import React, { useState } from "react";

import { MenuItem, Menu, IconButton, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import styles from "./styles";
import DropdownIcon from "../../icons/DropdownIcon";

const DropDownButton = ({
  menuItemArray,
  icon,
  buttonText,
  onClick,
  ...props
}) => {
  const theme = useTheme();
  const classes = styles(theme, props, buttonText);
  const [open, setOpen] = useState(null);
  const isOpen = Boolean(open);

  const handleDropDownClose = (e) => {
    e?.stopPropagation();
    setOpen(null);
  };

  const handleDropDownBtn = (e) => {
    e?.stopPropagation();
    setOpen(e.currentTarget);
  };

  return (
    <>
      {buttonText ? (
        <Button
          id={`${buttonText}`}
          endIcon={icon ? icon : <DropdownIcon />}
          disabled={props.disabled}
          classes={{
            root: classes.button,
            dropDownIcon: classes.dropDownIcon,
          }}
          onClick={(e) => handleDropDownBtn(e)}
          startIcon={props?.startIcon}
          varient={"filed"}
        >
          {buttonText}
        </Button>
      ) : (
        <IconButton
          id={`${buttonText}`}
          disabled={props.disabled}
          classes={{ dropDownIcon: classes.dropDownIcon }}
          onClick={(e) => handleDropDownBtn(e)}
        >
          {icon}
        </IconButton>
      )}

      <Menu
        id="lifecycle-menu"
        classes={{ paper: classes.paperRoot }}
        keepMounted
        anchorEl={open}
        getcontentanchorel={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isOpen}
        onClose={handleDropDownClose}
      >
        {menuItemArray.map((menuItem) => (
          <MenuItem
            key={menuItem.id}
            onClick={() => {
              onClick(menuItem);
              handleDropDownClose();
            }}
            className={classes.dropDownText}
          >
            {menuItem.dropDownText}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default DropDownButton;
