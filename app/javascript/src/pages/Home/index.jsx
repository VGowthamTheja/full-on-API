import { Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout";

import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { userState, setSpinner } = useContext(AuthContext)

  return (
    <Layout>
      <Typography>Welcome To {userState.user.email}</Typography>
    </Layout>
  );
};

export default Home;
