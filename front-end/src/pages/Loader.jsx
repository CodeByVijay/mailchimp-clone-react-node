import React from 'react'
import { Box } from '@mui/material'
import Sidebar from '../components/Sidebar';
import { styled } from '@mui/material/styles';

const Loader = () => {
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <img src="https://media.tenor.com/YPOStjIfQ2IAAAAM/loading-waiting.gif" alt="" />
                </Box>
            </Box>
        </>
    )
}

export default Loader
