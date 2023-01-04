import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidebar from '../../../components/createMenu/Sidebar';
import { Button, TextField } from '@mui/material';

const Regular = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  const handleBegin = (e) => {
    setTitle(e.target.value);
  }
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" style={{ margin: 'auto' }} sx={{ flexGrow: 1, p: 3 }}>
          <div className="textField">
            <h2>Create an email</h2>
            <Typography paragraph>
              Keep your subscribers engaged by sharing your latest news, promoting a line of products, or announcing an event.
            </Typography>
            <TextField fullWidth label="Enter Text" id="regularEmail" value={title} onChange={handleBegin} />
            <Button variant="contained" className='mt-3' onClick={() => {
              navigate('/admin/create-email', {
                titleData: title,
              });
            }}
            >Begin</Button>
          </div>
        </Box>
      </Box>
    </>
  )
}

export default Regular
