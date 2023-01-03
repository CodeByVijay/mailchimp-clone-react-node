import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidebar from '../components/Sidebar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Container, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { ArrowRightAlt } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const Dashboard = () => {

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

          <Container maxWidth='lg'>

            <Typography variant='h6' mt={5} mb={5}>
              Recommended next steps based on your profile...
            </Typography>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className='accordionTitle'>Create your first email</Typography>
              </AccordionSummary>
              <AccordionDetails className='accordian1'>
                <Grid container spacing={2}>
                  <Grid xs={12} sm={8} lg={8}>
                    <Typography variant='h5'>
                      Design high-performance emails in minutes
                    </Typography>
                    <p>
                      Get started with flexible templates, drag-and-drop design tools, and our built-in, expert advice.
                    </p>
                    <Link to='/admin/create-email'><Button variant="contained">Create</Button></Link>
                    <p>
                      Want to create something else? <a href="/">View everything we can make</a>
                    </p>
                  </Grid>

                  <Grid xs={12} sm={4} lg={4}>
                    <img src="https://www.sender.net/wp-content/uploads/2019/03/b032-What-Is-Email-Content-Definition-Types-Examples-small-1024x658.webp" width={400} height={200} />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className='accordionTitle'>Set up an automation</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='h5'>
                  Drive sales with our most popular pre-built automations
                </Typography>

                <Grid container>
                  <Grid xs={12} md={6} lg={4} mt={2} mb={2}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://www.sender.net/wp-content/uploads/2019/03/b032-What-Is-Email-Content-Definition-Types-Examples-small-1024x658.webp"
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Create Journey</Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid xs={12} md={6} lg={4} mt={2} mb={2}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://www.sender.net/wp-content/uploads/2019/03/b032-What-Is-Email-Content-Definition-Types-Examples-small-1024x658.webp"
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Create Journey</Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid xs={12} md={6} lg={4} mt={2} mb={2}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://www.sender.net/wp-content/uploads/2019/03/b032-What-Is-Email-Content-Definition-Types-Examples-small-1024x658.webp"
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Create Journey</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>

                <Button size="small">Browse All Journeys <ArrowRightAlt /></Button>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography className='accordionTitle'>Grow your audience</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='h5'>
                  Capture new leads with signup forms
                </Typography>

                <Grid container>
                  <Grid xs={12} md={6} lg={4} mt={2} mb={2}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://www.sender.net/wp-content/uploads/2019/03/b032-What-Is-Email-Content-Definition-Types-Examples-small-1024x658.webp"
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Create form</Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid xs={12} md={6} lg={4} mt={2} mb={2}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://www.sender.net/wp-content/uploads/2019/03/b032-What-Is-Email-Content-Definition-Types-Examples-small-1024x658.webp"
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Create form</Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid xs={12} md={6} lg={4} mt={2} mb={2}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://www.sender.net/wp-content/uploads/2019/03/b032-What-Is-Email-Content-Definition-Types-Examples-small-1024x658.webp"
                        title="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Build landing page</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>

              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography className='accordionTitle'>Connect your store</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='h5'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>

          </Container>

        </Box>
      </Box>
    </>
  )
}

export default Dashboard
