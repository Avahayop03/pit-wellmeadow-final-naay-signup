import { useState } from 'react';
import { AppBar, Toolbar, Container, Box, TextField, Button, Typography, IconButton, InputAdornment, Snackbar, Alert, FormControlLabel, Checkbox, GlobalStyles } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import supabase from '../Services/Supabase';
import bgImage from '../Images/bg.jpg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Something went wrong');
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleSignUpLinkClick = () => {
        navigate('/signup');
      };
    const login = async () => {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            setIsError(true);
            setErrorMessage('Invalid email or password');
            console.error('Error during sign-in:', error.message);
        } else if (data) {
            if (data.user) {
                navigate('/dashboard');
            } else {
                setIsError(true);
                setErrorMessage('Invalid email or password');
                console.error('Error fetching user details: No user data returned');
            }
        }
    };

    const handleCloseSnackbar = () => {
        setIsError(false);
    };

    return (
        <>
            <GlobalStyles styles={{ html: { margin: 0, padding: 0 }, body: { margin: 0, padding: 0 } }} />

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
                    overflow: 'hidden',
                }}
            >
                <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', mb: 2 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <IconButton color="inherit" component={Link} to="/" sx={{ color: 'white', marginLeft: 2 }}>
                            <ArrowBack />
                        </IconButton>
                        <Box></Box>
                    </Toolbar>
                    <Typography variant="h3" component="div" sx={{ textAlign: 'center', color: 'white', mt: 2 }}>
                        Wellmeadows Hospital
                    </Typography>
                </AppBar>
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        margin: 0,
                        padding: 0,
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
                        }}
                    >
                        <Box component="form" noValidate autoComplete="off">
                            <Typography 
                                variant="h5" 
                                component="h1" 
                                gutterBottom
                                sx={{
                                    color: '#0d47a1',
                                }}
                            >
                                Login Form
                            </Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                required
                                label="Email"
                                variant="outlined"
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{ style: { fontSize: 14 } }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                required
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    style: { fontSize: 14 },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{ style: { fontSize: 14 } }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={login}
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                    height: 50,
                                    fontSize: 'h6',
                                    backgroundColor: '#0288d1',
                                    '&:hover': { backgroundColor: '#01579b' },
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                        <Snackbar open={isError} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                                {errorMessage}
                            </Alert>
                        </Snackbar>

                        <Typography variant="body2" align="center">
                        Already have an account?{' '}
                        <Link component={Link} to="/signup" underline="none" onClick={handleSignUpLinkClick}>
                            SignUp
                        </Link>
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </>
    );
}