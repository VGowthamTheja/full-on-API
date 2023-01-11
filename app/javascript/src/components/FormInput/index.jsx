import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import strftime from "strftime";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../utils/Axios";
import "./style.css";

const FormInput = () => {
  const navigator = useNavigate()
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openPass, setOpenPass] = useState(false);
  const [userPassword, setUserPassword] = useState({
    password: "",
    password_confirmation: "",
    current_password: "",
  });
  const { userState,setSnackOpen } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const handleShowPassword = () => {
    setShow(!show);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    axios.patch(
      `/admin/registrations/${userData.id}`,
      { user: { ...userData } },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    handleEdit();
  };

  const handlePassChange = (event) => {
    setUserPassword({
      ...userPassword,
      [event.target.name]: event.target.value,
    });
  };

  const handlePasswordUpdate = () => {
    if (!openPass && Object.values(userPassword).some((value) => !value)) {
      return;
    } else if (
      openPass &&
      !Object.values(userPassword).some((value) => !value)
    ) {
      const resetPassword = async () => {
        const req = await axios.patch(
          `/admin/registrations/${userData.id}/reset_password`,
          { user: { ...userPassword } },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (req.data.message) {
          setSnackOpen({
            flag: true,
            message: req.data.message
          })
          navigator('/')
        }
      };
      resetPassword();
    }
  };

  useEffect(() => {
    setUserData({
      ...userState.user,
      firstname: userState.user.user_name?.split(" ")[0],
      lastname: userState.user.user_name?.split(" ")[1],
    });
  }, [userState]);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid container justifyContent="flex-end" alignItems={"center"}>
          {edit ? (
            <>
              {" "}
              <button className="btn cancel-btn" onClick={handleEdit}>
                cancel
              </button>{" "}
              <button className="btn save-btn" onClick={handleSubmit}>
                save
              </button>{" "}
            </>
          ) : (
            <button className="btn edit-btn" onClick={handleEdit}>
              edit
            </button>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>First Name</InputLabel>
          <TextField
            InputProps={{
              readOnly: !edit,
            }}
            required
            id="firstName"
            name="firstname"
            value={userData?.firstname}
            onChange={handleChange}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Last Name</InputLabel>
          <TextField
            required
            InputProps={{
              readOnly: !edit,
            }}
            id="lastName"
            name="lastname"
            value={userData?.lastname}
            onChange={handleChange}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Email Address</InputLabel>
          <TextField
            required
            InputProps={{
              readOnly: true,
            }}
            id="email"
            name="email"
            type="email"
            value={userData?.email}
            onChange={handleChange}
            fullWidth
            autoComplete=""
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Date of birth</InputLabel>
          <TextField
            required
            InputProps={{
              readOnly: !edit,
            }}
            name="dob"
            onChange={handleChange}
            type={"date"}
            value={strftime("%F", new Date(userData?.dob || "2000-01-01"))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Address</InputLabel>
          <TextField
            required
            InputProps={{
              readOnly: !edit,
            }}
            name="address"
            onChange={handleChange}
            value={userData?.address || ""}
            placeholder="Building,Street,City,State,Country..."
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <p
            className="update-password-link"
            onClick={() => setOpenPass(!openPass)}
          >
            {"<- udpate password ->"}
          </p>
        </Grid>
        {openPass ? (
          <>
            <Grid item xs={12}>
              <h2>Update password</h2>
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel>New Password</InputLabel>
              <TextField
                required
                type={show ? "text" : "password"}
                name="password"
                fullWidth
                value={userPassword.password}
                onChange={handlePassChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel>Password Confirmation</InputLabel>
              <TextField
                required
                type={show ? "text" : "password"}
                name="password_confirmation"
                fullWidth
                value={userPassword.password_confirmation}
                onChange={handlePassChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel>Current Password</InputLabel>
              <TextField
                required
                type={show ? "text" : "password"}
                name="current_password"
                fullWidth
                value={userPassword.current_password}
                onChange={handlePassChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={<Checkbox onChange={handleShowPassword} />}
                label="Show Password"
              />
            </Grid>{" "}
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={handlePasswordUpdate}
                color="success"
              >
                update
              </Button>
            </Grid>
          </>
        ) : null}
      </Grid>
    </div>
  );
};

export default FormInput;
