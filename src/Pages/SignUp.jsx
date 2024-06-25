import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link, IconButton, InputAdornment } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import supabase from '../Services/Supabase';
import bgImage from '../Images/bg.jpg';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    showPassword: false // State to toggle password visibility
  });

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName
          }
        }
      });

      if (error) throw error;

      alert('Check your email for verification link');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLoginLinkClick = () => {
    navigate('/login');
  };

  const togglePasswordVisibility = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      showPassword: !prevFormData.showPassword
    }));
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 2,
          p: 3,
          boxShadow: 3,
          backdropFilter: 'blur(10px)',
          mt: 3,
          alignSelf: 'center'
        }}
      >
        <Typography variant="h5" component="h1" align="center" gutterBottom sx={{ color: '#0d47a1' }}>
          Sign Up Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            required
            label="Full Name"
            variant="outlined"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            InputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
          />
          <TextField
            fullWidth
            margin="normal"
            required
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
          />
          <TextField
            fullWidth
            margin="normal"
            required
            label="Password"
            variant="outlined"
            type={formData.showPassword ? 'text' : 'password'} // Toggle password visibility
            name="password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              style: { fontSize: 14 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            InputLabelProps={{ style: { fontSize: 14 } }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              mt: 2,
              mb: 2,
              height: 50,
              fontSize: 'h6',
              backgroundColor: '#0288d1',
              '&:hover': { backgroundColor: '#01579b' }
            }}
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" align="center">
          Already have an account?{' '}
          <Link component={Link} to="/login" underline="none" onClick={handleLoginLinkClick}>
            Login
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default SignUp;
