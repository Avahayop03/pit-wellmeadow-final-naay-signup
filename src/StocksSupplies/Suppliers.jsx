import React, { useState, useEffect } from 'react';
import {
  Paper,
  Button,
  Container,
  TextField,
  InputAdornment,
  Divider,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';
import supabase from '../Services/Supabase'; // Ensure this path is correct

export default function SuppliersPage() {
  const navigate = useNavigate();
  const [supply, setSupply] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newSupply, setNewSupply] = useState({
    suppliername :'',
    supplieraddress:'',
    telephonenumber:'',
    faxnumber:'',
    
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
    setNewSupply({
      ...newSupply,
      [name]: value
    });
  };
  
  const handleUpdateClick = (supplies) => {
    setIsEdit(true);
    setEditId(supplies.id);
    setNewSupply({
      id: supplies.id,
      suppliernumber: supplies.suppliernumber,
      suppliername: supplies.suppliername,
      supplieraddress: supplies.supplieraddress,
      telephonenumber: supplies.telephonenumber,
      faxnumber: supplies.faxnumber
     

    });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      const dataToSave = {
        suppliername: newSupply.suppliername,
        supplieraddress: newSupply.supplieraddress,
        telephonenumber: newSupply.telephonenumber,
        faxnumber: newSupply.faxnumber,
     
      };

      const { data, error } = await supabase
        .from('suppliers')
        .insert(dataToSave)
        .select();

      if (error) {
        console.error("Error inserting data:", error.message);
        setError(error.message);
        return;
      }

      setSupply([...supply, data[0]]);
      setNewSupply({
        suppliername :'',
        supplieraddress:'',
        telephonenumber:'',
        faxnumber:'',
      });
      handleCloseDialog();
      setError(null); // Clear error state on success
    } catch (error) {
      console.error('Error saving supplies:', error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchSupplies();
  }, []);

  async function fetchSupplies() {
    try {
      const { data, error } = await supabase.from('suppliers').select('*');
      if (error) {
        console.error('Error fetching supplies:', error.message);
        setError(error.message);
        return;
      }
      setSupply(data);
      console.log('Fetched items:', data);
    } catch (error) {
      console.error('Error fetching supplies:', error.message);
      setError(error.message);
    }
  }


  const filteredSuppliers = supply.filter((supplier) =>
    (typeof supplier.suppliernumber === 'string' && supplier.suppliernumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof supplier.suppliername === 'string' && supplier.suppliername.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof supplier.supplieraddress === 'string' && supplier.supplieraddress.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof supplier.telephonenumber === 'string' && supplier.telephonenumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof supplier.faxnumber === 'string' && supplier.faxnumber.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <Typography sx={{ m: 0, mr: 'auto', fontSize: '20px' }}>Suppliers</Typography>
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Supplier Number</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Supplier Address</TableCell>
              <TableCell>Telephone Number</TableCell>
              <TableCell>Fax Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSuppliers.map((supplies) => (
              <TableRow key={supplies.suppliernumber}>
                <TableCell>{supplies.suppliernumber}</TableCell>
                <TableCell>{supplies.suppliername || ''}</TableCell>
                <TableCell>{supplies.supplieraddress || ''}</TableCell>
                <TableCell>{supplies.telephonenumber || ''}</TableCell>
                <TableCell>{supplies.faxnumber || ''}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleUpdateClick(supplies)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="contained" onClick={handleAddClick}>
          Add Suppliers
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEdit ? 'Edit Supplier' : 'Add New Supplier'}</DialogTitle>
        <DialogContent>
          
          <TextField
            margin="dense"
            name="suppliername"
            label="Supplier Name"
            fullWidth
            value={newSupply.suppliername }
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="supplieraddress"
            label="Supplier Address"
            fullWidth
            value={newSupply.supplieraddress }
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="telephonenumber"
            label="Telephone Number"
            fullWidth
            value={newSupply.telephonenumber }
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="faxnumber"
            label="Fax Number"
            fullWidth
            value={newSupply.faxnumber }
            onChange={handleInputChange}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
