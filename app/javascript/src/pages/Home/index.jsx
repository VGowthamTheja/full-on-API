import { Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import LoadSpinner from "../../components/LoadSpinner";
import Welcome from "../../components/Welcome";

import './style.css'

import { AuthContext } from "../../context/AuthContext";
import FlowTab from "../../components/FlowTab";

const Home = () => {
  const { userState, loading } = useContext(AuthContext)

  return (
    <Layout>
      {loading && <LoadSpinner  />}
      <div className="hero">
        <Welcome />
        <FlowTab />
      </div>
    </Layout>
  );
};

export default Home;
