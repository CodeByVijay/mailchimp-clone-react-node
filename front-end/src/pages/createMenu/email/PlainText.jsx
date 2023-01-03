import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidebar from '../../../components/createMenu/Sidebar';
import { Button, TextField } from '@mui/material';

const PlainText = () => {
   
  return (
    <>
     <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" style={{margin:'auto'}} sx={{ flexGrow: 1, p: 3 }}>
      <div className="textField">
        <h2>Create an email</h2>
        <Typography paragraph>
        Keep things simple and personal with a text-only email—no images, fancy styling, or embedded hyperlinks.
        </Typography>
        <TextField fullWidth label="Enter Text" id="regularEmail"/>
        <Button variant="contained" className='mt-3' onClick={()=>{alert('clicked')}}>Begin</Button>
        </div>
      </Box>
    </Box>
  </>
  )
}

export default PlainText
