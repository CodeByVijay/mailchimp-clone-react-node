import React, { useState } from 'react'
import { Box } from '@mui/system';
import { styled, useTheme } from '@mui/material/styles';
import Sidebar from '../components/Sidebar'
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';

const CreateEmail = () => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex: 999
  };

  const [title, setTitle] = useState('Untitled');
  const [flag, setFlag] = useState(false);
  const [addContact, setaddContact] = useState(false);
  const [addFrom, setaddFrom] = useState(false);
  const [subject, setSubject] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleTitleInput = (e) => {
    const val = e.target.value;
    setTitle(val)
  }

  const handleEdit = (e) => {
    setFlag(true)
  }
  const handleCancel = (e) => {
    setFlag(false)
    setaddContact(false)
    setaddFrom(false)
    setSubject(false)
  }
  const handleSave = (e) => {
    if (title === '') {
      setTitle('Untitled')
    }
    setTimeout(() => {
      setFlag(false)
    }, 0)
  }

  const handleAddReceipents = () => {
    setaddContact(true)
  }
  const handleAddFrom = () => {
    setaddFrom(true)
  }
  const handleSubject = () => {
    setSubject(true)
  }



  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {flag ? (<><Box><TextField value={title} onChange={(e) => handleTitleInput(e)} ></TextField><Button variant='contained' onClick={() => handleSave()}>Save</Button><p onClick={() => handleCancel()} style={{ cursor: 'pointer' }}>Cancel</p></Box></>) : (<><Typography variant='h4'>{title}</Typography><p className='text-secondary' style={{ cursor: 'pointer' }} onClick={() => handleEdit()}>Edit name</p></>)}

          <Container maxWidth='lg' style={{ border: '1px solid black', padding: '30px' }}>
            <Grid container>
              <Grid xs={12} lg={9} md={9}>
                <Typography variant='h3'>To</Typography>
                <p>Who are you sending this campaign to?</p>
              </Grid>
              {addContact ? (<>
                <Grid xs={12} lg={12} md={12} className="">
                  <center>
                    <Typography variant='h5'>Import Contact</Typography>
                    <Button variant='contained' onClick={() => handleAddReceipents()} color='success'>Import Contact</Button>
                    <p onClick={() => handleCancel()} style={{ cursor: 'pointer' }}>Cancel</p>
                  </center>

                </Grid>
              </>) : (<><Grid xs={12} lg={3} md={3} className="">
                <Button variant='contained' onClick={() => handleAddReceipents()}>Add Receipients</Button>
              </Grid></>)}

              <Grid xs={12} lg={9} md={9}>
                <Typography variant='h3'>From</Typography>
                <p>Who is sending this campaign?</p>
              </Grid>

              {addFrom ? (<>
                <Grid container className='m-2'>
                  <Grid xs={5} className='m-2'>
                    <TextField fullWidth label='Name'></TextField>
                    <span>Use something subscribers will instantly recognize, like your company name.</span>
                  </Grid>
                  <Grid xs={5} className='m-2'>
                    <TextField fullWidth label='Email'></TextField>
                  </Grid>
                  <Grid xs={12}>
                    <Button variant='contained'>Save</Button>
                    <Button onClick={() => handleCancel()}>Cancel</Button>
                  </Grid>
                </Grid>
              </>) : (<><Grid xs={12} lg={3} md={3} className=""><Button variant='contained' onClick={() => handleAddFrom()}>Add From</Button></Grid></>)}


              <Grid xs={12} lg={9} md={9}>
                <Typography variant='h3'>Subject</Typography>
                <p>What's the subject line for this campaign?</p>
              </Grid>

              {subject ? (<>
                <Grid container className='m-2'>
                  <Grid xs={5} className='m-2'>
                    <TextField fullWidth label='Subject'></TextField>
                  </Grid>
                  <Grid xs={5} className='m-2'>
                    <TextField fullWidth label='Preview Text'></TextField>
                  </Grid>
                  <Grid xs={12}>
                    <Button variant='contained'>Save</Button>
                    <Button onClick={() => handleCancel()}>Cancel</Button>
                  </Grid>
                </Grid>
              </>) : (<><Grid xs={12} lg={3} md={3} className=""><Button variant='contained' onClick={() => handleSubject()}>Add Subject</Button></Grid></>)}


              <Grid xs={12} lg={9} md={9}>
                <Typography variant='h3'>Content</Typography>
                <p>Design the content for your email.</p>
              </Grid>
              <Grid xs={12} lg={3} md={3} className=""><Button variant='contained' onClick={()=>handleOpen()}>Design Email</Button></Grid>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <span>&times;</span>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
                </Box>
              </Modal>

            </Grid>
          </Container>
        </Box>
      </Box>
    </div>
  )
}

export default CreateEmail

