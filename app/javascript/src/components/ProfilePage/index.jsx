import { ArrowBack } from "@mui/icons-material";
import { Avatar, Button, Card } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../FormInput";
import "./style.css";

const ProfilePage = () => {
    const navigator = useNavigate()
  return (
    <div className="card-base">
      <h1>Employee Profile</h1>
      <Card className="card-origin" raised>
        <div className="card-profile-img">
          <Button startIcon={<ArrowBack />} onClick={() => navigator("/")}>Home</Button>
          <Avatar
            alt="user-avatar"
            sx={{ width: "400px", height: "400px", margin: "10vh 0px" }}
            src="https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
          />
        </div>
        <div className="employee-edit-form">
            <FormInput />
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
