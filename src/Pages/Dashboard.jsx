import React, { useState, useMemo } from 'react';
import {
  AppBar as MuiAppBar, Box, Container, CssBaseline, Divider,
  Drawer as MuiDrawer, Grid, IconButton, List, styled, ThemeProvider,
  Toolbar, Typography, createTheme, Menu, MenuItem, Button
} from '@mui/material';
import { ChevronLeft as ChevronLeftIcon, Menu as MenuIcon, Brightness4, Brightness7, Logout } from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import MainListItems from '../Components/NavList'; 
import Copyright from '../Components/Copyright';

// Import your image
import hospitalImage from '/src/Images/doctor.jpg';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login'); // Navigate to the login page
    console.log('Logged out');
    handleClose();
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          background: {
            default: darkMode ? '#333' : '#fff',
          },
        },
        typography: {
          h6: {
            color: darkMode ? '#1976d2' : '#000',
          },
        },
      }),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography color="white" variant="h6" noWrap component="div">
                Wellmeadows Hospital
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <IconButton
                color="inherit"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <Logout />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <Divider />
          
          <List component="nav" sx={{ flexGrow: 1 }}>
            <MainListItems />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : '#333',
            color: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.text.primary
                : theme.palette.common.white,
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />  
          <Container maxWidth="false" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {location.pathname === '/dashboard' && (
                <>
                  <Grid item xs={12} position="relative">
                    <Box
                      component="img"
                      src={hospitalImage}
                      alt="Hospital"
                      sx={{
                        width: '100%',
                        maxHeight: '400px',
                        objectFit: 'cover',
                        borderRadius: 2,
                        boxShadow: 3,
                        filter: 'brightness(70%)', // Make the image slightly darker
                      }}
                    />
                    <Typography
                      variant="h3"
                      sx={{
                        position: 'absolute',
                        top: 60,
                        left: 70,
                        color: 'white',
                        fontFamily: 'inherit',
                        fontSize: '80px',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      Welcome to <br /> Wellmeadows!
                    </Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Outlet />
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}