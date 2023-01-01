import { Button, Menu, Fade, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

export default function AdminMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {user && user.roles?.includes("Admin") && (
        <Button color="inherit" onClick={handleClick} sx={{ typography: "h6" }}>
          ADMIN
        </Button>
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem component={Link} to="/studentPanel" onClick={handleClose}>
          Student Panel
        </MenuItem>
        <MenuItem component={Link} to="/coursePanel" onClick={handleClose}>
          Course Panel
        </MenuItem>
        <MenuItem component={Link} to="/courseMatchPanel" onClick={handleClose}>
          Course Matches Panel
        </MenuItem>
      </Menu>
    </>
  );
}
