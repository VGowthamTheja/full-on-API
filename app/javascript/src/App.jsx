import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginPage from "./components/LoginPage";
import { AuthContext } from "./context/AuthContext";
import RegistrationPage from "./components/RegistrationPage";
import axios from "axios";


const requestURLs = {
  LOGIN: '/login',
  REGISTER: '/register',
  LOGGED_IN: '/logged_in',
  IS_ADMIN: '/is_admin',
  LOGOUT: '/logout',
  SESSIONS: '/sessions',
  ADMIN_REGISTRATIONS: '/admin/registrations',
  SUPERVISORS: '/api/v1/data/supervisors',
  PROJECT_LIST: '/projects'
}

const App = () => {
  const navigator = useNavigate();

  const [snackOpen, setSnackOpen] = useState({ flag: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useState({
    loggedIn: "NOT_LOGGED_IN",
    user: {},
  });

  useEffect(() => {
    console.log("running effect");
    const settingUser = async () => {
      const req = await axios.get("http://localhost:3000/logged_in", {
        withCredentials: true,
      });
      console.log(req);
      if (req.data.logged_in && userState.loggedIn === "NOT_LOGGED_IN") {
        setUserState({
          loggedIn: "LOGGED_IN",
          user: req.data.user,
        });
        navigator(window.location.pathname);
      } else if (!req.data.logged_in && userState.loggedIn === "LOGGED_IN") {
        setUserState({
          loggedIn: "NOT_LOGGED_IN",
          user: {},
        });
        navigator("/login");
      } else if (
        !req.data.logged_in &&
        userState.loggedIn === "NOT_LOGGED_IN"
      ) {
        setUserState({
          loggedIn: "NOT_LOGGED_IN",
          user: {},
        });
        navigator("/login");
      }
    };
    settingUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userState,
        setUserState,
        snackOpen,
        setSnackOpen,
        loading,
        setLoading,
        requestURLs
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
