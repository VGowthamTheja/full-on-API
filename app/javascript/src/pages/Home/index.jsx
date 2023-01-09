import { Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout";
import LoadSpinner from "../../components/LoadSpinner";
import Projects from "../../components/Projects";
import Welcome from "../../components/Welcome";
import './style.css'

import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { userState, loading } = useContext(AuthContext)

  return (
    <Layout>
      {loading && <LoadSpinner  />}
      <div className="hero">
        <Welcome />
        <Projects />
      </div>
    </Layout>
  );
};

export default Home;
