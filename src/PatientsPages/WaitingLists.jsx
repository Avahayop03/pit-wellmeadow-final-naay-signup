import React, { useState, useEffect } from 'react';  // Import React and useState, useEffect hooks
import { Table, TableContainer, TableHead, TableBody, Button,
  TableRow, TableCell, Typography, Divider, Box, TextField, InputAdornment } from '@mui/material'; // Import Material-UI components
import SearchIcon from '@mui/icons-material/Search'; // Import search icon from Material-UI icons
import supabase from '../Services/Supabase';  // Import the supabase client for interacting with the database


const verticalLine = {
  border: '1px solid rgba(224, 224, 224, 1)'
};

const WaitingLists = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');  // State to hold the search query
  const [waitingPatient, setWaitingPatient] = useState([]);  // State to hold the list of outpatients

  // Handle search input change
  const handleSearch = (event) => {
    const searchQuery = event.target.value;  // Get the value from the input field
    setSearchQuery(searchQuery);  // Update the search query state
  };

  // Fetch outpatients data from Supabase on component mount
  useEffect(() => {
    fetchWaitingPatients();  // Call the function to fetch outpatients
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  // Function to fetch outpatients from Supabase
  async function fetchWaitingPatients() {
    try {
      const { data, error } = await supabase.from('inpatient_waiting_list').select('*');  // Fetch all columns from the 'outpatient' table
      if (error) {
        console.error('Error fetching waiting list', error.message);  // Log any errors
        return;
      }
      setWaitingPatient(data);  // Update the state with fetched data
      console.log(data);  // Log the data for debugging
    } catch (error) {
      console.error('Error fetching waiting lists', error.message);  // Log any errors from the try block
    }
  }

  // Filter the outpatients based on the search query
  const filteredWaitingPatients = waitingPatient.filter((patient) =>
    (patient && patient.patientnumber && patient.patientnumber.toString().includes(searchQuery)) ||
    (patient && patient.wardnumber && patient.wardnumber.toString().includes(searchQuery))
  );

  // Render the component
  return (
    <TableContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography component="h6" variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
          Waiting Lists 
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient Number</TableCell>  
            <TableCell>Ward Number</TableCell> 
          </TableRow>  
        </TableHead>
        <TableBody>
          {filteredWaitingPatients.map((patient) => (
            <TableRow key={patient.patientnumber}>  
              <TableCell>{patient.patientnumber}</TableCell>  
              <TableCell>{patient.wardnumber}</TableCell> 
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WaitingLists; 