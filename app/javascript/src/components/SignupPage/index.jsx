import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import "./style.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigator = useNavigate();
  const [error, setError] = useState(false);
  const { userState, setUserState, setSpinner } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(()=>{
    setSpinner(false)
  },[])

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !userData.email ||
      !userData.password ||
      !userData.password_confirmation
    ) {
      setError(true);
      return;
    }

    setError(false);

    fetch("http://localhost:3000/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          email: userData.email,
          password: userData.password,
          password_confirmation: userData.password_confirmation,
        },
      }),
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "created") {
          setUserState({
            loggedIn: "LOGGED_IN",
            user: data.user,
          });
          navigator("/");
        }
      })
      .catch((error) => {
        console.log("register err", error);
      });
  };

  return (
    <div className="register-form">
      <div className="register-title">
        <Typography variant="h4">FullOnAPI</Typography>
      </div>
      <FormGroup>
        <FormControl>
          <InputLabel error={error} htmlFor="email-input">
            Email address
          </InputLabel>
          <Input
            type="email"
            name="email"
            id="email-input"
            aria-describedby="my-helper-text"
            required
            error={error}
            value={userData.email}
            onChange={handleChange}
          />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
      </FormGroup>

      <FormGroup>
        <FormControl>
          <InputLabel error={error} htmlFor="password-input">
            Password
          </InputLabel>
          <Input
            type="password"
            name="password"
            id="password-input"
            aria-describedby="my-helper-text"
            required
            error={error}
            value={userData.password}
            onChange={handleChange}
          />
          <FormHelperText id="my-helper-text">
            minmum. 6 characters
          </FormHelperText>
        </FormControl>
      </FormGroup>

      <FormGroup>
        <FormControl>
          <InputLabel error={error} htmlFor="pc-input">
            Password confirmation
          </InputLabel>
          <Input
            type="password"
            name="password_confirmation"
            id="pc-input"
            aria-describedby="my-helper-text"
            required
            error={error}
            value={userData.password_confirmation}
            onChange={handleChange}
          />
          <FormHelperText id="my-helper-text">
            match above password
          </FormHelperText>
        </FormControl>
      </FormGroup>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Register
      </Button>
    </div>
  );
};

export default SignupPage;
