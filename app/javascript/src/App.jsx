import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  const navigator = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [snackOpen, setSnackOpen] = useState({ flag: false, message: "" });
  const [userState, setUserState] = useState({
    loggedIn: "NOT_LOGGED_IN",
    user: {},
  });

  useEffect(() => {
    console.log("running effect");
    fetch("http://localhost:3000/logged_in", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.logged_in && userState.loggedIn === "NOT_LOGGED_IN") {
          console.log(data);
          setUserState({
            loggedIn: "LOGGED_IN",
            user: data.user,
          });
          navigator(window.location.pathname);
        } else if (!data.logged_in && userState.loggedIn === "LOGGED_IN") {
          setUserState({
            loggedIn: "NOT_LOGGED_IN",
            user: {},
          });
          navigator("/login");
        } else if (!data.logged_in && userState.loggedIn === "NOT_LOGGED_IN") {
          setUserState({
            loggedIn: "NOT_LOGGED_IN",
            user: {},
          });
          navigator("/login");
        }
      })
      .catch((error) => {
        console.log("logging_error", error);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ userState, setUserState, snackOpen, setSnackOpen }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
