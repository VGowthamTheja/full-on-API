import { Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout";
import SnackTop from "../../components/SnackTop";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { userState, setSpinner } = useContext(AuthContext)

  useEffect(()=>{
    console.log('setting spinner false from home');
    setSpinner(false)
  },[])
  return (
    <Layout>
      <Typography>Welcome To {userState.user.email}</Typography>
      <SnackTop />
    </Layout>
  );
};

export default Home;
