import React, { useState, useEffect } from 'react';
import {
  Paper, Button, Container, TextField, InputAdornment, Divider,
  Box, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import supabase from '../src/Services/Supabase'; // Ensure the path to your supabase service is correct

const RegisterPatient = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);
  };

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    console.log('Saving new requisition...');
    handleCloseDialog();
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    try {
      const { data, error } = await supabase.from('localdoctors').select('*');
      if (error) {
        console.error('Error fetching local doctors', error.message);
        return;
      }
      setPatients(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching local doctors', error.message);
    }
  }

  const filteredPatients = patients.filter((patient) =>
    patient.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.patientnumber.toString().includes(searchQuery) ||
    patient.clinicnumber.toString().includes(searchQuery)
  );

  return (
    <Container maxWidth="false" sx={{ mt: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          sx={{
            color: 'white',
            width: '150px',
            padding: '12px 24px',
            backgroundColor: 'green',
            '&:hover': {
              backgroundColor: 'darkgreen',
            },
          }}
          onClick={handleAddClick}
        >
          Add
        </Button>
      </Box>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box
            style={{
              marginBottom: '16px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Typography sx={{ m: 0, mr: 'auto', fontSize: '20px' }}>Local Doctors</Typography>
            <TextField
              variant="outlined"
              placeholder="Search"
              sx={{ borderRadius: 1, ml: 'auto' }} // Move to the right
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  ml: 2,
                  borderRadius: 2, // Adding borderRadius
                },
              }}
              onChange={handleSearch}
            />
          </Box>
        </Paper>
      </Grid>

      <Divider sx={{ mb: 2 }} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Patient number</TableCell>
              <TableCell>Clinic number</TableCell>
              <TableCell>Appointment number</TableCell>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Telephone number</TableCell>
              <TableCell>Date of birth</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Marital Status</TableCell>
              <TableCell>Date registered</TableCell>
              <TableCell>
                <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.patientnumber}>
                <TableCell>{patient.patientnumber}</TableCell>
                <TableCell>{patient.clinicnumber}</TableCell>
                <TableCell>{patient.appointmentnumber}</TableCell>
                <TableCell>{patient.firstname}</TableCell>
                <TableCell>{patient.lastname}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>{patient.telephonenumber}</TableCell>
                <TableCell>{patient.dateofbirth}</TableCell>
                <TableCell>{patient.sex}</TableCell>
                <TableCell>{patient.maritalstatus}</TableCell>
                <TableCell>{patient.dateregistered}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                      sx={{
                        width: '150px',
                        backgroundColor: '#0288d1',
                        '&:hover': { backgroundColor: '#193b4d' },
                        borderRadius: '5px',
                        color: 'white',
                        mb: 1,
                        fontSize: '0.70rem',
                      }}
                    >
                      Add to outpatient
                    </Button>
                    <Divider orientation="vertical" flexItem sx={{ mx: 2 }} /> {/* Vertical Divider */}
                    <Button
                      sx={{
                        width: '150px',
                        backgroundColor: '#0288d1',
                        '&:hover': { backgroundColor: '#193b4d' },
                        borderRadius: '5px',
                        color: 'white',
                        ml: 1,
                        mb: 1,
                        fontSize: '0.70rem',
                      }}
                      onClick={handleAddClick}
                    >
                      Add to waiting list
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add functionality */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Patient Registration Form</DialogTitle>
        <DialogContent>
          <TextField fullWidth variant="outlined" label="First name" sx={{ mb: 2 }} />
          <TextField fullWidth variant="outlined" label="Last name" sx={{ mb: 2 }} />
          <TextField fullWidth variant="outlined" label="Address" sx={{ mb: 2 }} />
          <TextField fullWidth variant="outlined" label="Telephone number" sx={{ mb: 2 }} />
          <TextField fullWidth variant="outlined" label="Date of birth" sx={{ mb: 2 }} />
          <TextField fullWidth variant="outlined" label="Marital Status" multiline rows={4} sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: 'green', color: 'white' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default RegisterPatient;
