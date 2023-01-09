import {
  Avatar,
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadSpinner from "../LoadSpinner";

const RegistrationPage = () => {
  const navigator = useNavigate();
  const [error, setError] = useState(false);
  const [managers, setManagers] = useState([{ id: "none", user_name: "none", role:'none' }]);
  const { userState, setSnackOpen, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "user",
    manager: "",
  });

  

  useEffect(() => {
    const restrictedUser = async () => {
      const req = await axios.get('http://localhost:3000/is_admin')

      if (req.data.status === 'ok') {
        return
      } else if (req.data.status === 'forbidden') {
        navigator('../')
        setSnackOpen({
          flag: true,
          message: "You do not belong there!!"
        })
      } else {
        setSnackOpen({
          flag: true,
          message: "You do not belong there!!"
        })
      }

    };
    // Restricting unconfirmed users.
    restrictedUser()

    // fetch the managers
    fetch("http://localhost:3000/api/v1/data/supervisors")
      .then((response) => response.json())
      .then((data) => {
        setManagers(data.data);
      })
      .catch((error) => {
        console.log("Error getting managers", error);
      });
  }, []);

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(userData).some((value) => !value)) {
      setError(true);
      return;
    }

    setError(false);

    // POST request to save the user record
    fetch("http://localhost:3000/admin/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          ...userData,
        },
      }),
      credentials: "same-origin",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response from employee creation", data);
        if (data.status === "created") {
          setSnackOpen({
            flag: true,
            message: "Record was created successfully.",
          });
          navigator("../");
        }
      })
      .catch((error) => {
        console.log("register err", error);
      });
  };

  return (
    <div className="register-form">
      {loading && <LoadSpinner />}
      <div className="image-container">
        <div className="register-title">
          <Typography variant="h4">Employee Form</Typography>
        </div>
        <div className="avatar-image">
          <Avatar
            alt="user-avatar"
            sx={{ width: "400px", height: "400px" }}
            src="https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
          />
          <Button onClick={()=>navigator('/')}>Home</Button>
        </div>
      </div>
      <div className="form-block">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstname"
              label="First name"
              value={userData.firstname}
              onChange={handleChange}
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastname"
              label="Last name"
              value={userData.lastname}
              onChange={handleChange}
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              type="email"
              label="Email address"
              value={userData.email}
              onChange={handleChange}
              fullWidth
              autoComplete=""
              variant="standard"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl required sx={{ m: 1, minWidth: 160 }}>
              <InputLabel id="demo-simple-select-required-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={userData.role}
                name="role"
                label="Role *"
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value={"Manager"}>Manager</MenuItem>
                <MenuItem value={"TL"}>Team Lead</MenuItem>
                <MenuItem value={"user"}>Candidate</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required sx={{ m: 1, minWidth: 160 }}>
              <InputLabel id="demo-simple-select-required-label">
                Supervisors
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={userData.manager}
                name="manager"
                label="Supervisors *"
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value={userState.user.id} key={`${userState.user.id}`} >
                  Self({ userState.user.user_name })
                </MenuItem>
                {managers.map((manager) => {
                  return (
                    <MenuItem value={manager.id} key={`${manager.id}`}>
                      {manager.user_name}({manager.role})
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSubmit} variant="contained" fullWidth>
              Register Employee
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default RegistrationPage;
