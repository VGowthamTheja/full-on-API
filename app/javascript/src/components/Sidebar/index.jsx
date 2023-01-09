import {
  AssignmentInd,
  Diversity3,
  Home,
  Hub,
  Info,
  Person,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AccountSettings from "../AccountSettings";
import MenuIcon from "../MenuIcon";
import "./style.css";

export const directPaths = {
  Home: "/",
  About: "/about",
  Login: "/login",
  Register: "/register",
  Users: 'users',
  Managers: 'managers',
  Candidates: '/candidates',
  Projects: '/projects',
};

const Sidebar = () => {
  const navigator = useNavigate();
  const handlePath = (event) => {
    navigator(directPaths[event.target.textContent]);
  };
  return (
    <div className="sidebar-base">
      <div className="sidebar-logo">
        <Typography variant="h4">API Rails App</Typography>
      </div>
      <hr />
      <div className="sidebar-body">
        <div className="pages">
          <p className="sidebar_title">PAGES</p>
          <div className="icon" onClick={handlePath}>
            {" "}
            <Home /> <span>Home</span>
          </div>
          <div className="icon" onClick={handlePath}>
            {" "}
            <Info /> <span>About</span>
          </div>
        </div>
        <div className="utility">
          <p className="sidebar_title">UTILITY</p>
          <div className="icon" onClick={handlePath}>
            {" "}
            <AssignmentInd /> <span>Users</span>
          </div>
          <div className="icon" onClick={handlePath}>
            {" "}
            <Person /> <span>Managers</span>
          </div>
          <div className="icon" onClick={handlePath}>
            {" "}
            <Diversity3 /> <span>Candidates</span>
          </div>
          <div className="icon" onClick={handlePath}>
            {" "}
            <Hub /> <span>Projects</span>
          </div>
        </div>
        <AccountSettings />
      </div>
    </div>
  );
};

export default Sidebar;
