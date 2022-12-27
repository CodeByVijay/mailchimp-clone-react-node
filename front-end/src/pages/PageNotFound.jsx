import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Sidebar from '../components/Sidebar';


const PageNotFound = () => {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        <h1>Page Not Found......</h1>
        </Box>
      </Box>
    </>
  )
}

export default PageNotFound
