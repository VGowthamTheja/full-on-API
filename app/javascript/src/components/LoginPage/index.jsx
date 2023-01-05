import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import React from "react";
import "./style.css";

const LoginPage = () => {
  return (
    <div className="login-form">
      <div className="login-title">
        <Typography variant="h4">FullOnAPI</Typography>
      </div>
      <FormGroup>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input
            type="email"
            name="email"
            id="my-input"
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
            type="password"
            name="password"
            id="my-input"
            aria-describedby="my-helper-text"
            required
          />
          <FormHelperText id="my-helper-text">
            minmum. 6 characters
          </FormHelperText>
        </FormControl>
      </FormGroup>
      <Button variant="contained" color="primary">
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
