import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  Box,
  Typography,
  DialogActions,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

import supabase from '../Services/Supabase'; // Ensure this path is correct

export default function SurgicalSupplies() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newStocks, setNewStocks] = useState({
    itemname: '',
    itemdescription: '',
    quantityinstock: '',
    reorderlevel: '',
    costperunit: ''
  });
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddClick = () => {
        setIsEdit(false); // Set isEdit to false when adding a new item

    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStocks({
      ...newStocks,
      [name]: value
    });
  };
  
  const handleUpdateClick = (item) => {
    setIsEdit(true);
    setEditId(item.id);
    setNewStocks({
      id: item.id,
      itemnumber: item.itemnumber,
      itemname: item.itemname,
      itemdescription: item.itemdescription,
      quantityinstock: item.quantityinstock,
      reorderlevel: item.reorderlevel,
      costperunit: item.costperunit

    });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      const dataToSave = {
        itemname: newStocks.itemname,
        itemdescription: newStocks.itemdescription,
        quantityinstock: newStocks.quantityinstock,
        reorderlevel: newStocks.reorderlevel,
        costperunit: newStocks.costperunit,
      };

      const { data, error } = await supabase
        .from('surgical_and_non_surgical_supplies')
        .insert(dataToSave)
        .select();

      if (error) {
        console.error("Error inserting data:", error.message);
        setError(error.message);
        return;
      }

      setStocks([...stocks, data[0]]);
      setNewStocks({
        itemname: '',
        itemdescription: '',
        quantityinstock: '',
        reorderlevel: '',
        costperunit: ''
      });
      handleCloseDialog();
      setError(null); // Clear error state on success
    } catch (error) {
      console.error('Error saving stocks:', error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const { data, error } = await supabase.from('surgical_and_non_surgical_supplies').select('*');
      if (error) {
        console.error('Error fetching items:', error.message);
        setError(error.message);
        return;
      }
      setStocks(data);
      console.log('Fetched items:', data);
    } catch (error) {
      console.error('Error fetching items:', error.message);
      setError(error.message);
    }
  }

  const filteredSurgicalAndNonSurgicalSupplies = stocks.filter((item) =>
    (typeof item.itemnumber === 'string' && item.itemnumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof item.itemname === 'string' && item.itemname.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof item.itemdescription === 'string' && item.itemdescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof item.quantityinstock === 'string' && item.quantityinstock.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof item.reorderlevel === 'string' && item.reorderlevel.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof item.costperunit === 'string' && item.costperunit.includes(searchQuery))
  );

  return (
    <Container maxWidth="lg">
      <Box
        style={{
          marginBottom: '16px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Typography sx={{ m: 0, mr: 'auto', fontSize: '20px' }}>Surgical and Non-Surgical Supplies</Typography>
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
      <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item Number</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Item Description</TableCell>
            <TableCell>Quantity In Stock</TableCell>
            <TableCell>Reorder Level</TableCell>
            <TableCell>Cost Per Unit</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSurgicalAndNonSurgicalSupplies.map((item) => (
            <TableRow key={item.itemnumber}>
              <TableCell>{item.itemnumber}</TableCell>
              <TableCell>{item.itemname || ''}</TableCell>
              <TableCell>{item.itemdescription || ''}</TableCell>
              <TableCell>{item.quantityinstock || ''}</TableCell>
              <TableCell>{item.reorderlevel || ''}</TableCell>
              <TableCell>{item.costperunit || ''}</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => handleUpdateClick(item)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="contained" onClick={handleAddClick}>
          Add Surgical and Non-Surgical Supply
        </Button>
      </Box>
      
      {/* Dialog for Add functionality */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEdit ? 'Edit Stocks' : 'Add New Stocks'}</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              margin="dense"
              name="itemname"
              label="Item Name"
              fullWidth
              value={newStocks.itemname}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="itemdescription"
              label="Item Description"
              fullWidth
              value={newStocks.itemdescription}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="quantityinstock"
              label="Quantity In Stock"
              fullWidth
              value={newStocks.quantityinstock}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="reorderlevel"
              label="Reorder Level"
              fullWidth
              value={newStocks.reorderlevel}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="costperunit"
              label="Cost Per Unit"
              fullWidth
              value={newStocks.costperunit}
              onChange={handleInputChange}
            />
          </Box>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
