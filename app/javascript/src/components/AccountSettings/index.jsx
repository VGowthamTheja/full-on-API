import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { directPaths } from "../Sidebar";
import { AuthContext } from "../../context/AuthContext";

export default function AccountSettings() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { setUserState } = React.useContext(AuthContext);
  const navigator = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserTransfer = (event) => {
    handleClose();
    navigator(directPaths[event.target.textContent]);
  };

  handleLogout = () => {
    handleClose();
    fetch("http://localhost:3000/logout", {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => {
        console.log("logout", response);
        setUserState({
          loggedIn: "NOT_LOGGED_IN",
          user: {},
        });
        navigator(directPaths['Login']);
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };

  return (
    <div>
      <Button
        className="basic_btn"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Settings
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleUserTransfer}>Register</MenuItem>
        <MenuItem onClick={handleUserTransfer}>Login</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
