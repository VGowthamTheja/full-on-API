import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadSpinner from "../LoadSpinner";
import SnackTop from "../SnackTop";
import "./style.css";

const LoginPage = () => {
  const navigator = useNavigate();
  const [error, setError] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const { setUserState, setSnackOpen, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const setNotification = (message) => {
    setSnackOpen({
      flag: true,
      message: message
    })
  }

  useEffect(()=>{
    setNotification('sign in to continue...')
  },[])

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userData.email || !userData.password) {
      setError(true);
      setNotification('Fields should not be empty');
      return;
    }

    setError(false);
    console.log('clicked on submit');
    fetch("http://localhost:3000/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          email: userData.email,
          password: userData.password,
        },
      }),
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.logged_in) {
          setUserState({
            loggedIn: "LOGGED_IN",
            user: data.user,
          });
          navigator("/");
          setSnackOpen({
            flag: true,
            message: 'Logged in successfully!!'
          })
        } else if (!data.logged_in) {
          setNotification('Unable to log in. Please check your credentials!')
          console.log('unable to login', data);
        }
      })
      .catch((error) => {
        console.log("register err", error);
      });
  };

  const visibleEye = useMemo(()=>{
    if (visibility) {
      return <VisibilityOff className="visible-eye" onClick={()=>setVisibility(!visibility)} />
    } else {
      return <Visibility className="visible-eye" onClick={()=>setVisibility(!visibility)} />
    }
  },[visibility])

  return (
    <div className="login-form">
      <SnackTop />
      {loading && <LoadSpinner />}
      <div className="login-title">
        <Typography variant="h4">FullOnAPI</Typography>
      </div>
      <FormGroup>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input
            value={userData.email}
            error={error}
            onChange={handleChange}
            type="email"
            name="email"
            id="me-input"
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
      </FormGroup>

      <FormGroup>
        <FormControl>
          <InputLabel htmlFor="my-input">Password</InputLabel>
          <Input
            value={userData.password}
            error={error}
            onChange={handleChange}
            type={visibility ? "text": "password"}
            name="password"
            id="mp-input"
            aria-describedby="my-helper-text"
            required
            endAdornment={visibleEye}
          />
          <FormHelperText id="my-helper-text">
            minmum. 6 characters
          </FormHelperText>
        </FormControl>
      </FormGroup>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
