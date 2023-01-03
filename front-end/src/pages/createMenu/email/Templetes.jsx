import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidebar from '../../../components/createMenu/Sidebar';

const Templetes = () => {
   
  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography paragraph>
         Templetes Page
        </Typography>
       
      </Box>
    </Box>
  </>
  )
}

export default Templetes
