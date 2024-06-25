import { Container, Grid, Paper, CssBaseline, Toolbar, Box} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

export default function Patient() {
  

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline /> 
        <Container maxWidth="false" sx={{ mt: -5, mb: 2 }}> 
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              pr: '24px',
            }}
          >
           
          </Toolbar>
          <Grid container spacing={5} justifyContent="flex-start" alignItems="center" >
            <Grid item xs={12}>
              <Grid container spacing={3} justifyContent="space-between" alignItems="center" sx={{mb:-2}}>
              <Grid item xs={3}>
                  <Link to="/dashboard/patient" style={{ textDecoration: 'none' }}>
                    <Paper elevation={3}
                      sx={{
                        p: 2,
                        backgroundColor: '#007bff',
                        '&:hover': { backgroundColor: '#0056b3' },
                        color: '#fff',
                        textAlign: 'center',
                        borderRadius:'400px',
                      }}
                      variant="contained"
                    >
                      All Patient
                    </Paper>
                  </Link>
                </Grid>
                <Grid item xs={3}>
                  <Link to="/dashboard/patient/outPatient" style={{ textDecoration: 'none' }}>
                    <Paper elevation={3}
                      sx={{
                        p: 2,
                        backgroundColor: '#d32f2f',
                        '&:hover': { backgroundColor: '#b71c1c' },
                   color: '#fff',
                        textAlign: 'center',
                        borderRadius:'400px',
                      }}
                      variant="contained"
                    >
                      Out Patient
                    </Paper>
                  </Link>
                </Grid>

                <Grid item xs={3}>
                  <Link to="/dashboard/patient/waitingLists" style={{ textDecoration: 'none' }}>
                    <Paper
                      sx={{
                        p: 2,
                        backgroundColor: '#388e3c',
                        '&:hover': { backgroundColor: '#194d33' },
                        color: '#fff',
                        textAlign: 'center',
                        borderRadius:'400px',
                      }}
                      variant="contained"
                    >
                      Waiting List
                    </Paper>
                  </Link>
                </Grid>

                <Grid item xs={3}>
                  <Link to="/dashboard/patient/currentInPatient" style={{ textDecoration: 'none' }}>
                    <Paper
                      sx={{
                        p: 2,
                        backgroundColor: '#ffa000',
                        '&:hover': { backgroundColor: '#f57f17' },
                        color: '#fff',
                        textAlign: 'center',
                        borderRadius:'400px',
                      }}
                      variant="contained"
                    >
                      In Patient
                    </Paper>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Outlet />                      
              </Paper>
            </Grid>
          </Grid>
        </Container>
   </Box>
  );
}
