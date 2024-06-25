import React, { useState, useEffect } from 'react';  // Import React and useState, useEffect hooks
import { Table, TableContainer, TableHead, TableBody, Button, TableRow, TableCell, Typography, Divider, Box, TextField, Paper, InputAdornment } from '@mui/material'; // Import Material-UI components
import SearchIcon from '@mui/icons-material/Search'; // Import search icon from Material-UI icons
import supabase from '../Services/Supabase';  // Import the supabase client for interacting with the database

const verticalLine = {
  border: '1px solid rgba(224, 224, 224, 1)'
};

const CurrentInPatient = () => {
  const [searchQuery, setSearchQuery] = useState('');  // State to hold the search query
  const [currentInPatients, setCurrentPatients] = useState([]);  // State to hold the list of inpatients

  // Handle search input change
  const handleSearch = (event) => {
    const searchQuery = event.target.value;  // Get the value from the input field
    setSearchQuery(searchQuery);  // Update the search query state
  };

  // Fetch inpatients data from Supabase on component mount
  useEffect(() => {
    fetchCurrentPatients();  // Call the function to fetch inpatients
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  // Function to fetch inpatients from Supabase
  async function fetchCurrentPatients() {
    try {
      const { data, error } = await supabase.from('inpatient').select('*');  // Fetch all columns from the 'inpatient' table
      if (error) {
        console.error('Error fetching inpatient list', error.message);  // Log any errors
        return;
      }
      setCurrentPatients(data);  // Update the state with fetched data
      console.log(data);  // Log the data for debugging
    } catch (error) {
      console.error('Error fetching inpatient', error.message);  // Log any errors from the try block
    }
  }

  // Filter the inpatients based on the search query
  const filteredInPatients = currentInPatients.filter((patient) =>
    (patient && patient.patientnumber && patient.patientnumber.toString().includes(searchQuery)) ||
    (patient && patient.expectedstaydays && patient.expectedstaydays.toString().includes(searchQuery)) ||
    (patient && patient.dateplaced && patient.dateplaced.toString().includes(searchQuery)) ||
    (patient && patient.dateleave && patient.dateleave.toString().includes(searchQuery)) ||
    (patient && patient.actualleave && patient.actualleave.toString().includes(searchQuery)) ||
    (patient && patient.bednumber && patient.bednumber.toString().includes(searchQuery))
  );

  return (
    <TableContainer component={Paper}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography component="h6" variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
          In Patient Lists 
        </Typography>
      <TextField
          variant="outlined"
          placeholder="Search"  // Placeholder text for the search input
          sx={{ ml: 2, borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />  
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
            },
          }}
          onChange={handleSearch}  // Call handleSearch on input change
        />
        </Box>
      <Divider sx={{ mb: 2 }} />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={verticalLine}>Patient Number</TableCell>
            <TableCell sx={verticalLine}>Expected days of stay</TableCell>
            <TableCell sx={verticalLine}>Date placed</TableCell>
            <TableCell sx={verticalLine}>Date leave</TableCell>
            <TableCell sx={verticalLine}>Actual leave</TableCell>
            <TableCell sx={verticalLine}>Bed number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredInPatients.map((patient) => (
            <TableRow key={patient.patientnumber}>  
              <TableCell>{patient.patientnumber}</TableCell>  
              <TableCell>{patient.expectedstaydays}</TableCell> 
              <TableCell>{patient.dateplaced}</TableCell> 
              <TableCell>{patient.dateleave}</TableCell>
              <TableCell>{patient.actualleave}</TableCell>
              <TableCell>{patient.bednumber}</TableCell> 
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CurrentInPatient;