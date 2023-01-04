import { Home, Info } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import AccountSettings from "../AccountSettings";
import MenuIcon from "../MenuIcon";
import "./style.css";

const Sidebar = () => {
  return (
    <div className="sidebar-base">
      <div className="sidebar-logo">
        <Typography variant="h4">API Rails App</Typography>
      </div>
      <hr />
      <div className="sidebar-body">
        <div className="pages">
            <p className="sidebar_title">PAGES</p>
            <div className="icon"> <Home /> <span>Home</span></div>
            <div className="icon"> <Info /> <span>About</span></div>
        </div>
        <div className="utility">
            <p className="sidebar_title">UTILITY</p>
            <MenuIcon />
        </div>
        <AccountSettings />
      </div>
    </div>
  );
};

export default Sidebar;
