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
import supabase from '../Services/Supabase';

const Wards = () => {
  const [wards, setWards] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newWard, setNewWard] = useState({
    wardname: '',
    wardlocation: '',
    totalnumberofbeds: '',
    telephoneextnumber: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchWards();
  }, []);

  useEffect(() => {
    console.log('Wards state:', wards);
  }, [wards]);

  async function fetchWards() {
    try {
      const { data, error } = await supabase.from('ward').select('*');
      if (error) {
        console.error('Error fetching wards:', error.message);
        return;
      }
      console.log('Fetched Wards:', data);
      setWards(data);
    } catch (error) {
      console.error('Error fetching wards:', error.message);
    }
  }

  const filteredWards = wards.filter((ward) =>
    (typeof ward.wardname === 'string' && ward.wardname.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof ward.wardlocation === 'string' && ward.wardlocation.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof ward.totalnumberofbeds === 'string' && ward.totalnumberofbeds.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof ward.telephoneextnumber === 'string' && ward.telephoneextnumber.includes(searchQuery))
  );

  console.log('Filtered Wards:', filteredWards);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEditClick = () => {
    setIsEdit(false);
    setNewWard({
      wardname: '',
      wardlocation: '',
      totalnumberofbeds: '',
      telephoneextnumber: ''
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewWard({ ...newWard, [name]: value });
  };

  const handleSave = async () => {
    if (isEdit) {
      try {
        const { error } = await supabase
          .from('ward')
          .update(newWard)
          .eq('wardnumber', editId);

        if (error) {
          console.error('Error updating ward:', error.message);
          return;
        }

        await fetchWards();
        handleCloseDialog();
      } catch (error) {
        console.error('Error updating ward:', error.message);
      }
    } else {
      try {
        const { error } = await supabase.from('ward').insert([newWard]);

        if (error) {
          console.error('Error adding new ward:', error.message);
          return;
        }

        await fetchWards();
        handleCloseDialog();
      } catch (error) {
        console.error('Error adding new ward:', error.message);
      }
    }
  };

  const handleUpdateClick = (ward) => {
    setIsEdit(true);
    setEditId(ward.wardnumber);
    setNewWard({
      wardname: ward.wardname,
      wardlocation: ward.wardlocation,
      totalnumberofbeds: ward.totalnumberofbeds,
      telephoneextnumber: ward.telephoneextnumber
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
            <Typography sx={{ m: 0, mr: 'auto', fontSize: '20px' }}>Wards</Typography>
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
                  <TableCell>Ward Name</TableCell>
                  <TableCell>Ward Location</TableCell>
                  <TableCell>Total Number of Beds</TableCell>
                  <TableCell>Telephone Extension Number</TableCell>
                  <TableCell>
                    <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>Action</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredWards.map((ward) => (
                  <TableRow key={ward.wardnumber}>
                    <TableCell>{ward.wardname}</TableCell>
                    <TableCell>{ward.wardlocation}</TableCell>
                    <TableCell>{ward.totalnumberofbeds}</TableCell>
                    <TableCell>{ward.telephoneextnumber}</TableCell>
                    <TableCell>
                      <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" onClick={() => handleUpdateClick(ward)}>
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
        <DialogTitle>{isEdit ? 'Edit Ward' : 'Add New Ward'}</DialogTitle>
        <DialogContent>
          <TextField
            name="wardname"
            label="Ward Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newWard.wardname}
            onChange={handleInputChange}
          />
          <TextField
            name="wardlocation"
            label="Ward Location"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newWard.wardlocation}
            onChange={handleInputChange}
          />
          <TextField
            name="totalnumberofbeds"
            label="Total Number of Beds"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newWard.totalnumberofbeds}
            onChange={handleInputChange}
          />
          <TextField
            name="telephoneextnumber"
            label="Telephone Extension Number"
            fullWidth
            margin="normal"
            variant="outlined"
            value={newWard.telephoneextnumber}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button variant= "contained" onClick={handleSave}  sx={{ backgroundColor: 'green', color: 'white' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Wards;
