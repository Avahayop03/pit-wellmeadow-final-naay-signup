import React, { useEffect, useState } from 'react';
import {
  Paper,
  Button,
  Container,
  TextField,
  InputAdornment,
  Divider,
  Box,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import supabase from '../Services/Supabase';

const verticalLine = {
  border: '1px solid rgba(224, 224, 224, 1)'
};

const PatientMedication = () => {
  const navigate = useNavigate();
  const [patientMed, setPatientMed] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPatientMed, setNewPatientMed] = useState({
    drugnumber: '',
    drugname: '',
    unitsperday: '',
    startdate: '',
    finishdate: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPatientMed();
  }, []);

  async function fetchPatientMed() {
    try {
      const { data, error } = await supabase.from('patient_medication').select('*');
      if (error) {
        console.error('Error fetching patient medication:', error.message);
        return;
      }
      setPatientMed(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching patient medication', error.message);
    }
  }

  const filteredPatientMed = patientMed.filter((patientMeds) =>
    (typeof patientMeds.patientnumber === 'string' && patientMeds.patientnumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof patientMeds.drugnumber === 'string' && patientMeds.drugnumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof patientMeds.drugname === 'string' && patientMeds.drugname.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof patientMeds.startdate === 'string' && patientMeds.startdate.toString().includes(searchQuery)) ||
    (typeof patientMeds.finishdate === 'string' && patientMeds.finishdate.toString().includes(searchQuery)) ||
    (typeof patientMeds.unitsperday === 'string' && patientMeds.unitsperday.toString().includes(searchQuery))
  );

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEditClick = () => {
    setIsEdit(false);
    setNewPatientMed({
      patientnumber: '',
      drugnumber: '',
      drugname: '',
      unitsperday: '',
      startdate: '',
      finishdate: ''
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPatientMed({ ...newPatientMed, [name]: value });
  };

  const handleSave = async () => {
    if (isEdit) {
      try {
        const { error } = await supabase
          .from('patient_medication')
          .update(newPatientMed)
          .eq('id', editId);

        if (error) {
          console.error('Error updating patient medication:', error.message);
          return;
        }

        await fetchPatientMed();
        handleCloseDialog();
      } catch (error) {
        console.error('Error updating patient medication', error.message);
      }
    } else {
      try {
        const { error } = await supabase.from('patient_medication').insert([newPatientMed]);

        if (error) {
          console.error('Error saving new patient medication:', error.message);
          return;
        }

        await fetchPatientMed();
        handleCloseDialog();
      } catch (error) {
        console.error('Error saving new patient medication', error.message);
      }
    }
  };

  const handleUpdateClick = (patientMedi) => {
    setIsEdit(true);
    setEditId(patientMedi.id);
    setNewPatientMed({
      id: patientMedi.id,
      patientnumber: patientMedi.patientnumber,
      drugnumber: patientMedi.drugnumber,
      drugname: patientMedi.drugname,
      unitsperday: patientMedi.unitsperday,
      startdate: patientMedi.startdate,
      finishdate: patientMedi.finishdate
    });
    setOpenDialog(true);
  };

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
          onClick={handleEditClick}
        >
          Add
        </Button>
      </Box>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box
            style={{
              marginBottom: '16px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Typography sx={{ m: 0, mr: 'auto', fontSize: '20px' }}>Patient Medication</Typography>
            <TextField
              variant="outlined"
              placeholder="Search"
              sx={{ borderRadius: 1, ml: 'auto' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  ml: 2,
                  borderRadius: 2,
                },
              }}
              onChange={handleSearch}
            />
          </Box>
          <Divider sx={{ mb: 2 }} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={verticalLine}>Patient number</TableCell>
                  <TableCell sx={verticalLine}>Drug number</TableCell>
                  <TableCell sx={verticalLine}>Drug name</TableCell>
                  <TableCell sx={verticalLine}>Start date</TableCell>
                  <TableCell sx={verticalLine}>Finish date</TableCell>
                  <TableCell sx={verticalLine}>Units per day</TableCell>
                  <TableCell sx={verticalLine}>
                    <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>Action</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatientMed.map((patientMedi) => (
                  <TableRow key={patientMedi.id}>
                    <TableCell sx={verticalLine}>{patientMedi.patientnumber}</TableCell>
                    <TableCell sx={verticalLine}>{patientMedi.drugnumber}</TableCell>
                    <TableCell sx={verticalLine}>{patientMedi.drugname}</TableCell>
                    <TableCell sx={verticalLine}>{patientMedi.startdate}</TableCell>
                    <TableCell sx={verticalLine}>{patientMedi.finishdate}</TableCell>
                    <TableCell sx={verticalLine}>{patientMedi.unitsperday}</TableCell>
                    <TableCell sx={verticalLine}>
                      <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant = "contained" onClick={() => handleUpdateClick(patientMedi)}>
                          Update
                        </Button>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEdit ? 'Edit Patient Medication' : 'Add New Patient Medication'}</DialogTitle>
        <DialogContent>
          <TextField
            name="patientnumber"
            label="Patient Number"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newPatientMed.patientnumber}
            onChange={handleInputChange}
            disabled
          />
          <TextField
            name="drugnumber"
            label="Drug Number"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newPatientMed.drugnumber}
            onChange={handleInputChange}
          />
          <TextField
            name="drugname"
            label="Drug Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newPatientMed.drugname}
            onChange={handleInputChange}
          />
          <TextField
            name="unitsperday"
            label="Units Per Day"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newPatientMed.unitsperday}
            onChange={handleInputChange}
          />
          <TextField
            name="startdate"
            label="Start Date"
            type="date"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newPatientMed.startdate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="finishdate"
            label="Finish Date"
            type="date"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newPatientMed.finishdate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientMedication;
