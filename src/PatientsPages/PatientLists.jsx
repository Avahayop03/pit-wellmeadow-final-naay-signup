import React, { useEffect, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Box,
  TextField,
  InputAdornment,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import supabase from '../Services/Supabase';

const PatientLists = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editPatientId, setEditPatientId] = useState(null);
  const [deletePatientId, setDeletePatientId] = useState(null);

  // Get today's date in the format yyyy-mm-dd
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [newPatient, setNewPatient] = useState({
    clinicnumber: '',
    appointmentnumber: '',
    firstname: '',
    lastname: '',
    address: '',
    telephonenumber: '',
    dateofbirth: '',
    sex: '',
    maritalstatus: '',
    dateregistered: getTodayDate() // Set default value to today's date
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const { data, error } = await supabase.from('patients').select('*');
      if (error) {
        console.error('Error fetching patient lists:', error.message);
        return;
      }
      setPatients(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching patient lists', error.message);
    }
  }

  const handleOpenDialog = () => {
    setIsEdit(false);
    setEditPatientId(null);
    setNewPatient({
      clinicnumber: '',
      appointmentnumber: '',
      firstname: '',
      lastname: '',
      address: '',
      telephonenumber: '',
      dateofbirth: '',
      sex: '',
      maritalstatus: '',
      dateregistered: getTodayDate()
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    if (isEdit) {
      try {
        const { data, error } = await supabase
          .from('patients')
          .update(newPatient)
          .eq('patientnumber', editPatientId);
        if (error) {
          console.error('Error updating patient:', error.message);
          return;
        }
        fetchPatients();
        handleCloseDialog();
      } catch (error) {
        console.error('Error updating patient:', error.message);
      }
    } else {
      try {
        const { data, error } = await supabase
          .from('patients')
          .insert([newPatient]);
        if (error) {
          console.error('Error saving patient:', error.message);
          return;
        }
        fetchPatients();
        handleCloseDialog();
      } catch (error) {
        console.error('Error saving patient:', error.message);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPatient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEditClick = (patient) => {
    setIsEdit(true);
    setEditPatientId(patient.patientnumber);
    setNewPatient({
      clinicnumber: patient.clinicnumber,
      appointmentnumber: patient.appointmentnumber,
      firstname: patient.firstname,
      lastname: patient.lastname,
      address: patient.address,
      telephonenumber: patient.telephonenumber,
      dateofbirth: patient.dateofbirth,
      sex: patient.sex,
      maritalstatus: patient.maritalstatus,
      dateregistered: patient.dateregistered
    });
    setOpenDialog(true);
  };

  const handleDeleteClick = (patientId) => {
    setDeletePatientId(patientId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .delete()
        .eq('patientnumber', deletePatientId);
      if (error) {
        console.error('Error deleting patient:', error.message);
        return;
      }
      fetchPatients();
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting patient:', error.message);
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const matches = 
      (patient.firstname && patient.firstname.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (patient.lastname && patient.lastname.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (patient.patientnumber && patient.patientnumber.toString().includes(searchQuery)) ||
      (patient.clinicnumber && patient.clinicnumber.toString().includes(searchQuery));
    return matches;
  });

  return (
    <TableContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography component="h6" variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
          Patient lists
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={handleOpenDialog}
        >
          Add Registration
        </Button>
        <TextField
          variant="outlined"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ ml: 2, borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
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
                <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>Actions</Typography>
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
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEditClick(patient)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDeleteClick(patient.patientnumber)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>{isEdit ? 'Edit Patient Registration' : 'Add Patient Registration'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Patient Number"
                name="patientnumber"
                value={newPatient.patientnumber}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                disabled // Disable the input field
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Clinic Number"
                name="clinicnumber"
                value={newPatient.clinicnumber}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Appointment Number"
                name="appointmentnumber"
                value={newPatient.appointmentnumber}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="First Name"
                name="firstname"
                value={newPatient.firstname}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Last Name"
                name="lastname"
                value={newPatient.lastname}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Address"
                name="address"
                value={newPatient.address}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Telephone Number"
                name="telephonenumber"
                value={newPatient.telephonenumber}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Date of Birth"
                name="dateofbirth"
                type="date"
                value={newPatient.dateofbirth}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Sex"
                name="sex"
                value={newPatient.sex}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                select
              >
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="F">F</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Marital Status"
                name="maritalstatus"
                value={newPatient.maritalstatus}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                select
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Divorced">Divorced</MenuItem>
                <MenuItem value="Widowed">Widowed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Date Registered"
                name="dateregistered"
                type="date"
                value={newPatient.dateregistered}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this patient record?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default PatientLists;
