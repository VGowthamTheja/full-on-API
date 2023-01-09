import { Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import Layout from '../../components/Layout'
import LoadSpinner from '../../components/LoadSpinner'
import { AuthContext } from '../../context/AuthContext'

const About = () => {
  const { loading } = useContext(AuthContext);
  
  return (
    <div>
      <Layout>
        {loading && <LoadSpinner />}
        <Typography variant='h4'>About</Typography>
      </Layout>
    </div>
  )
}

export default About