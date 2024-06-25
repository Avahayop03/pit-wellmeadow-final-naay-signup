import React, { useRef } from 'react';
import { Button, Container, Box, Typography, Grid, Paper, GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import AvahImage from '../Images/avah.png';
import MarrielleImage from '../Images/maryel.png';
import MarkImage from '../Images/mark.png';
import backgroundImage from '../Images/bg.jpg'; // Import the background image

const Home = () => {
  const aboutUsRef = useRef(null);
  const teamRef = useRef(null);
  const loginRef = useRef(null); // Define loginRef

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Roboto, sans-serif',
      color: '#333',
    }}>
      <GlobalStyles styles={{ html: { margin: 0, padding: 0 }, body: { margin: 0, padding: 0, fontFamily: 'Roboto, sans-serif', color: '#333' } }} />
      
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <img src={backgroundImage} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)' }} />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Button color="inherit" component={Link} to="/login" sx={{ mx: 1, color: '#fff', fontWeight: 'bold' }}>Login</Button>
        <Button color="inherit" onClick={() => handleScroll(aboutUsRef)} sx={{ mx: 1, color: '#fff', fontWeight: 'bold' }}>About Us</Button>
        <Button color="inherit" onClick={() => handleScroll(teamRef)} sx={{ mx: 1, color: '#fff', fontWeight: 'bold' }}>Team</Button>
      </Box>

      <Container maxWidth="sm" sx={{ height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ whiteSpace: 'nowrap', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', mb: 1, color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          Welcome to Wellmeadows Hospital
        </Typography>
        <Typography variant="body1" align="center" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#fff', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>
          Discover excellence in healthcare at Wellmeadows Hospital, where we blend compassionate patient care with innovative medical solutions. Our dedicated team strives to ensure your well-being every step of the way.
        </Typography>
      </Container>

      <Container ref={loginRef} maxWidth="sm" style={{ height: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      </Container>

      <Container ref={teamRef} sx={{ py: 4 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          OUR TEAM:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} align="center">
            <Paper elevation={3} sx={{ padding: 2, borderRadius: '50%', overflow: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <Box
                sx={{
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={AvahImage}
                  alt="Avah Ayop"
                  sx={{
                    width: '80%',
                    height: 'auto',
                  }}
                />
              </Box>
            </Paper>
            <Typography variant="h6" align="center" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#fff', mt: 1 }}>Avah Ayop</Typography>
          </Grid>
          <Grid item xs={12} sm={4} align="center">
            <Paper elevation={3} sx={{ padding: 2, borderRadius: '50%', overflow: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <Box
                sx={{
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={MarrielleImage}
                  alt="Marrielle Anne Sumunod"
                  sx={{
                    width: '80%',
                    height: 'auto',
                  }}
                />
              </Box>
            </Paper>
            <Typography variant="h6" align="center" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#fff', mt: 1 }}>Marrielle Anne Sumunod</Typography>
          </Grid>
          <Grid item xs={12} sm={4} align="center">
            <Paper elevation={3} sx={{ padding: 2, borderRadius: '50%', overflow: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <Box
                sx={{
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={MarkImage}
                  alt="Mark Rey Allanic"
                  sx={{
                    width: '80%',
                    height: 'auto',
                  }}
                />
              </Box>
            </Paper>
            <Typography variant="h6" align="center" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#fff', mt: 1 }}>Mark Rey Allanic</Typography>
          </Grid>
        </Grid>
      </Container>

      <Container ref={aboutUsRef} maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          About us:
        </Typography>
        <Typography variant="body1" align="center" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#fff', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', mb: 2 }}>
          Welcome to Wellmeadows Hospital
        </Typography>
        <Typography variant="body1" align="center" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#fff', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>
          Wellmeadows Hospital has been a cornerstone
          of healthcare in our community for over 50 years. 
          Our mission is to provide exceptional medical care with compassion, 
          respect, and a commitment to excellence. We believe in treating 
          every patient as a unique individual, ensuring their physical, 
          emotional, and spiritual needs are met.
        </Typography>
      </Container>
    </div>
  );
};

export default Home;