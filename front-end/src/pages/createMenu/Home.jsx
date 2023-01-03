import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidebar from '../../components/createMenu/Sidebar';
import { Card, Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';


const Home = () => {

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" className='createHome' sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant='h4'>
            Create something that gets noticed
          </Typography>

          <Typography variant='p' className='headLine'>
            Based on best practices
          </Typography>

          <Grid container className='boxes' spacing={2}>
            <Grid item xs={1} sm={2} md={4} lg={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://sparkmailapp.com/img/blog/introducing-email-templates.png?1592587369412"
                    alt="green iguana"
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
                </CardActionArea>
                <CardActions sx={{ justifyContent: "center",margin:"20px 0" }}>
                  <Button size="medium" color="primary" variant="outlined">
                    Design Email
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={1} sm={2} md={4} lg={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://sparkmailapp.com/img/blog/introducing-email-templates.png?1592587369412"
                    alt="green iguana"
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
                </CardActionArea>
                <CardActions sx={{ justifyContent: "center",margin:"20px 0" }}>
                  <Button size="medium" color="primary" variant="outlined">
                    Build Landing Page
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={1} sm={2} md={4} lg={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://sparkmailapp.com/img/blog/introducing-email-templates.png?1592587369412"
                    alt="green iguana"
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
                </CardActionArea>
                <CardActions sx={{ justifyContent: "center",margin:"20px 0" }}>
                  <Button size="medium" color="primary" variant="outlined">
                    Create Form
                  </Button>
                </CardActions>
              </Card>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Home
