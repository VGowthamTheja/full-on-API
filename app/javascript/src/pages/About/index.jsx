import { Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import Layout from '../../components/Layout'
import { AuthContext } from '../../context/AuthContext'

const About = () => {
  const { setSpinner } = useContext(AuthContext);
  
  return (
    <div>
      <Layout>
        <Typography variant='h4'>About</Typography>
      </Layout>
    </div>
  )
}

export default About