import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./style.css";

const LoginPage = () => {
  const navigator = useNavigate();
  const [error, setError] = useState(false);
  const { setUserState, setSpinner } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{
    setSpinner(false)
  },[])

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userData.email || !userData.password) {
      setError(true);
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
        } else if (!data.logged_in) {
          console.log('unable to login', data);
        }
      })
      .catch((error) => {
        console.log("register err", error);
      });
  };

  return (
    <div className="login-form">
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
            type="password"
            name="password"
            id="mp-input"
            aria-describedby="my-helper-text"
            required
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
