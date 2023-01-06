import { Box, CircularProgress } from '@mui/material';
import React from 'react'

const LoadSpinner = () => {
  return (
    <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center', position:'absolute' }}>
      <CircularProgress size={120} />
    </Box>
  );
}

export default LoadSpinner