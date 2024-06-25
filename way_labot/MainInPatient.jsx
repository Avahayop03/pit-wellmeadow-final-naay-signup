import {  TableContainer, Typography, Divider, Box, TextField,
        InputAdornment, Grid, Paper } from '@mui/material';
import {Link, Outlet} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';


export default function MainInPatient() {
  return (
   
    <TableContainer>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to='/dashboard/patient/currentInPatient'>
            <Typography component="h6" variant="h6" color="inherit" sx={{ flexGrow: 1, textDecoration:"none"}} >
              Current InPatient Lists
            </Typography>
          </Link>

          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} /> {/* Vertical Divider */}
          
          <Link to='/dashboard/patient/currentInPatient/dischargePatient'>
            <Typography component="h6" variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
              Discharged
            </Typography>
          </Link>
        </Box>

        <TextField
          variant="outlined"
          placeholder="Search"
          sx={{ ml: 2, borderRadius: 1, width: '250px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2, // Adding borderRadius
            },
          }}
        />
      </Box>

    <Divider sx={{ mb: 1, mt:2}} />
        <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Outlet />                      
              </Paper>
            </Grid>
    </TableContainer>
            
  )
}
