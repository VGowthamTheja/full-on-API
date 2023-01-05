import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./style.css";

const SignupPage = () => {
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

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
