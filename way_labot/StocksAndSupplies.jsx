import React, { useState, useEffect } from 'react';
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
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';
import supabase from '../src/Services/Supabase'; // Ensure this path is correct

export default function StocksAndSupplies() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pharmaceuticalSupplies, setPharmaceuticalSupplies] = useState([]);
  const [surgicalAndNonSurgicalSupplies, setSurgicalAndNonSurgicalSupplies] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [newStock, setNewStock] = useState({}); // For adding new stock
  const [isEditMode, setIsEditMode] = useState(false); // For edit mode
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
    fetchDrugs();
    fetchSupplies();
  }, [selectedCategory]);

  useEffect(() => {
    console.log('Wards state:', surgicalAndNonSurgicalSupplies);
  }, [surgicalAndNonSurgicalSupplies]);

  async function fetchItems() {
    try {
      const { data, error } = await supabase.from('surgical_and_non_surgical_supplies').select('*');
      if (error) {
        console.error('Error fetching items:', error.message);
        return;
      }
      console.log('Fetched items:', data);
      setSurgicalAndNonSurgicalSupplies(data);
    } catch (error) {
      console.error('Error fetching items:', error.message);
    }
  }

  async function fetchDrugs() {
    try {
      const { data, error } = await supabase.from('pharmaceutical_supplies').select('*');
      if (error) {
        console.error('Error fetching pharmaceutical:', error.message);
        return;
      }
      console.log('Fetched pharmaceutical:', data);
      setPharmaceuticalSupplies(data);
    } catch (error) {
      console.error('Error fetching pharmaceutical:', error.message);
    }
  }

  async function fetchSupplies() {
    try {
      const { data, error } = await supabase.from('suppliers').select('*');
      if (error) {
        console.error('Error fetching suppliers:', error.message);
        return;
      }
      console.log('Fetched suppliers:', data);
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error.message);
    }
  }

  const filteredSurgicalAndNonSurgicalSupplies = surgicalAndNonSurgicalSupplies.filter((surgical_and_non_surgical) =>
    (typeof surgical_and_non_surgical.itemnumber === 'string' && surgical_and_non_surgical.itemnumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof surgical_and_non_surgical.itemname === 'string' && surgical_and_non_surgical.itemname.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof surgical_and_non_surgical.itemdescription === 'string' && surgical_and_non_surgical.itemdescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof surgical_and_non_surgical.quantityinstock === 'string' && surgical_and_non_surgical.quantityinstock.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof surgical_and_non_surgical.reorderlevel === 'string' && surgical_and_non_surgical.reorderlevel.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof surgical_and_non_surgical.costperunit === 'string' && surgical_and_non_surgical.costperunit.includes(searchQuery))
  );

  const filteredPharmaceuticalSupplies = pharmaceuticalSupplies.filter((pharmaceutical_supplies) =>
    (typeof pharmaceutical_supplies.drugnumber === 'string' && pharmaceutical_supplies.drugnumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.drugname === 'string' && pharmaceutical_supplies.drugname.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.drugdescription === 'string' && pharmaceutical_supplies.drugdescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.drugdosage === 'string' && pharmaceutical_supplies.drugdosage.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.methodofadmin === 'string' && pharmaceutical_supplies.methodofadmin.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.quantityinstock === 'string' && pharmaceutical_supplies.quantityinstock.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.reorderlevel === 'string' && pharmaceutical_supplies.reorderlevel.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof pharmaceutical_supplies.costperunit === 'string' && pharmaceutical_supplies.costperunit.includes(searchQuery))
  );

  const filteredSuppliers = suppliers.filter((supplier) =>
    (typeof supplier.suppliernumber === 'string' && supplier.suppliernumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof supplier.suppliername === 'string' && supplier.suppliername.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof supplier.supplieraddress === 'string' && supplier.supplieraddress.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof supplier.telephonenumber === 'string' && supplier.telephonenumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof supplier.faxnumber === 'string' && supplier.faxnumber.toLowerCase().includes(searchQuery.toLowerCase())) 
  );

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEditClick = (item) => {
    setNewStock(item); // Set selected item data for editing
    setIsEditMode(true); // Enable edit mode
    setOpenDialog(true);
  };

  const handleAddClick = () => {
    setNewStock({}); // Reset new stock data
    setIsEditMode(false); // Disable edit mode
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        // Update existing item
        if (selectedCategory === 'Surgical and Non-Surgical') {
          const { data, error } = await supabase
            .from('surgical_and_non_surgical_supplies')
            .update(newStock)
            .eq('itemnumber', newStock.itemnumber);
          if (error) throw error;
          setSurgicalAndNonSurgicalSupplies(surgicalAndNonSurgicalSupplies.map(item => item.itemnumber === newStock.itemnumber ? data[0] : item));
        } else if (selectedCategory === 'Pharmaceutical') {
          const { data, error } = await supabase
            .from('pharmaceutical_supplies')
            .update(newStock)
            .eq('drugnumber', newStock.drugnumber);
          if (error) throw error;
          setPharmaceuticalSupplies(pharmaceuticalSupplies.map(drug => drug.drugnumber === newStock.drugnumber ? data[0] : drug));
        } else if (selectedCategory === 'Suppliers') {
          const { data, error } = await supabase
            .from('suppliers')
            .update(newStock)
            .eq('suppliernumber', newStock.suppliernumber);
          if (error) throw error;
          setSuppliers(suppliers.map(supplier => supplier.suppliernumber === newStock.suppliernumber ? data[0] : supplier));
        }
      } else {
        // Add new item
        if (selectedCategory === 'Surgical and Non-Surgical') {
          const { data, error } = await supabase
            .from('surgical_and_non_surgical_supplies')
            .insert([newStock]);
          if (error) throw error;
          setSurgicalAndNonSurgicalSupplies([...surgicalAndNonSurgicalSupplies, data[0]]);
        } else if (selectedCategory === 'Pharmaceutical') {
          const { data, error } = await supabase
            .from('pharmaceutical_supplies')
            .insert([newStock]);
          if (error) throw error;
          setPharmaceuticalSupplies([...pharmaceuticalSupplies, data[0]]);
        } else if (selectedCategory === 'Suppliers') {
          const { data, error } = await supabase
            .from('suppliers')
            .insert([newStock]);
          if (error) throw error;
          setSuppliers([...suppliers, data[0]]);
        }
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving data:', error.message);
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStock((prevStock) => ({
      ...prevStock,
      [name]: value,
    }));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const renderTable = () => {
    switch (selectedCategory) {
      case 'Surgical and Non-Surgical':
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Number</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Item Description</TableCell>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>Reorder Level</TableCell>
                <TableCell>Cost Per Unit</TableCell>
                <TableCell>Actions</TableCell> {/* Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSurgicalAndNonSurgicalSupplies.map((item) => (
                <TableRow key={item.itemnumber}>
                  <TableCell>{item.itemnumber}</TableCell>
                  <TableCell>{item.itemname}</TableCell>
                  <TableCell>{item.itemdescription}</TableCell>
                  <TableCell>{item.quantityinstock}</TableCell>
                  <TableCell>{item.reorderlevel}</TableCell>
                  <TableCell>{item.costperunit}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditClick(item)}>Edit</Button>
                  </TableCell> {/* Edit button */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'Pharmaceutical':
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Drug Number</TableCell>
                <TableCell>Drug Name</TableCell>
                <TableCell>Drug Description</TableCell>
                <TableCell>Drug Dosage</TableCell>
                <TableCell>Method of Administration</TableCell>
                <TableCell>Quantity In Stock</TableCell>
                <TableCell>Reorder Level</TableCell>
                <TableCell>Cost Per Unit</TableCell>
                <TableCell>Actions</TableCell> {/* Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPharmaceuticalSupplies.map((drug) => (
                <TableRow key={drug.drugnumber}>
                  <TableCell>{drug.drugnumber}</TableCell>
                  <TableCell>{drug.drugname}</TableCell>
                  <TableCell>{drug.drugdescription}</TableCell>
                  <TableCell>{drug.drugdosage}</TableCell>
                  <TableCell>{drug.methodofadmin}</TableCell>
                  <TableCell>{drug.quantityinstock}</TableCell>
                  <TableCell>{drug.reorderlevel}</TableCell>
                  <TableCell>{drug.costperunit}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditClick(drug)}>Edit</Button>
                  </TableCell> {/* Edit button */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'Suppliers':
        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Supplier Number</TableCell>
                <TableCell>Supplier Name</TableCell>
                <TableCell>Supplier Address</TableCell>
                <TableCell>Telephone Number</TableCell>
                <TableCell>Fax Number</TableCell>
                <TableCell>Actions</TableCell> {/* Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.suppliernumber}>
                  <TableCell>{supplier.suppliernumber}</TableCell>
                  <TableCell>{supplier.suppliername}</TableCell>
                  <TableCell>{supplier.supplieraddress}</TableCell>
                  <TableCell>{supplier.telephonenumber}</TableCell>
                  <TableCell>{supplier.faxnumber}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditClick(supplier)}>Edit</Button>
                  </TableCell> {/* Edit button */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      default:
        return <Typography>Please select a category to view the table.</Typography>;
    }
  };

  const renderDialogContent = () => {
    switch (selectedCategory) {
      case 'Surgical and Non-Surgical':
        return (
          <Box>
            <TextField
              margin="dense"
              name="itemnumber"
              label="Item Number"
              fullWidth
              value={newStock.itemnumber || ''}
              onChange={handleInputChange}
              disabled
            />
            <TextField
              margin="dense"
              name="itemname"
              label="Item Name"
              fullWidth
              value={newStock.itemname || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="itemdescription"
              label="Item Description"
              fullWidth
              value={newStock.itemdescription || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="quantityinstock"
              label="Quantity In Stock"
              fullWidth
              value={newStock.quantityinstock || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="reorderlevel"
              label="Reorder Level"
              fullWidth
              value={newStock.reorderlevel || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="costperunit"
              label="Cost Per Unit"
              fullWidth
              value={newStock.costperunit || ''}
              onChange={handleInputChange}
            />
          </Box>
        );
      case 'Pharmaceutical':
        return (
          <Box>
            <TextField
              margin="dense"
              name="drugnumber"
              label="Drug Number"
              fullWidth
              value={newStock.drugnumber || ''}
              onChange={handleInputChange}
              disabled
            />
            <TextField
              margin="dense"
              name="drugname"
              label="Drug Name"
              fullWidth
              value={newStock.drugname || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="drugdescription"
              label="Drug Description"
              fullWidth
              value={newStock.drugdescription || ''}
              onChange={handleInputChange}
              
            />
            <TextField
              margin="dense"
              name="drugdosage"
              label="Drug Dosage"
              fullWidth
              value={newStock.drugdosage || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="methodofadmin"
              label="Method of Administration"
              fullWidth
              value={newStock.methodofadmin || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="quantityinstock"
              label="Quantity In Stock"
              fullWidth
              value={newStock.quantityinstock || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="reorderlevel"
              label="Reorder Level"
              fullWidth
              value={newStock.reorderlevel || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="costperunit"
              label="Cost Per Unit"
              fullWidth
              value={newStock.costperunit || ''}
              onChange={handleInputChange}
            />
          </Box>
        );
      case 'Suppliers':
        return (
          <Box>
            <TextField
              margin="dense"
              name="suppliernumber"
              label="Supplier Number"
              fullWidth
              value={newStock.suppliernumber || ''}
              onChange={handleInputChange}
              disabled
            />
            <TextField
              margin="dense"
              name="suppliername"
              label="Supplier Name"
              fullWidth
              value={newStock.suppliername || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="supplieraddress"
              label="Supplier Address"
              fullWidth
              value={newStock.supplieraddress || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="telephonenumber"
              label="Telephone Number"
              fullWidth
              value={newStock.telephonenumber || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="faxnumber"
              label="Fax Number"
              fullWidth
              value={newStock.faxnumber || ''}
              onChange={handleInputChange}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginBottom: 4 }}>
        <Grid item>
          <Paper elevation={2} onClick={() => handleCategoryClick('Surgical and Non-Surgical')} sx={{ padding: 2, cursor: 'pointer' }}>
            <MedicalServicesIcon fontSize="large" />
            <Typography variant="subtitle1">Surgical and Non-Surgical Supplies</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={2} onClick={() => handleCategoryClick('Pharmaceutical')} sx={{ padding: 2, cursor: 'pointer' }}>
            <MedicationIcon fontSize="large" />
            <Typography variant="subtitle1">Pharmaceutical Supplies</Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={2} onClick={() => handleCategoryClick('Suppliers')} sx={{ padding: 2, cursor: 'pointer' }}>
            <LocalShippingIcon fontSize="large" />
            <Typography variant="subtitle1">Suppliers</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: 2 }} />
      <TextField
        label="Search"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: 2 }}
      />
      <Paper elevation={2} sx={{ padding: 2 }}>
        {renderTable()}
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="contained" onClick={handleAddClick}>
          Add Stock
        </Button>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEditMode ? 'Edit Stock' : 'Add New Stock'}</DialogTitle>
        <DialogContent>
          {renderDialogContent()}
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
