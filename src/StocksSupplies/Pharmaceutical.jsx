import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  TextField,
  InputAdornment,
  Box,
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
import { useNavigate } from 'react-router-dom';
import supabase from '../Services/Supabase'; // Ensure this path is correct

export default function PharmaceuticalSupplies() {
  const navigate = useNavigate();
  const [drugs, setDrugs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newDrug, setNewDrug] = useState({
    drugname: '',
    drugdescription: '',
    drugdosage: '',
    methodofadmin: '',
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
    setNewDrug({
      drugname: '',
      drugdescription: '',
      drugdosage: '',
      methodofadmin: '',
      quantityinstock: '',
      reorderlevel: '',
      costperunit: ''
    });
    setError(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDrug({
      ...newDrug,
      [name]: value
    });
  };

  const handleEditClick = (drug) => {
    setIsEdit(true);
    setEditId(drug.id);
    setNewDrug({
      id: drug.id,
      drugname: drug.drugname,
      drugdescription: drug.drugdescription,
      drugdosage: drug.drugdosage,
      methodofadmin: drug.methodofadmin,
      quantityinstock: drug.quantityinstock,
      reorderlevel: drug.reorderlevel,
      costperunit: drug.costperunit
    });
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      const dataToSave = {
        drugname: newDrug.drugname,
        drugdescription: newDrug.drugdescription,
        drugdosage: newDrug.drugdosage,
        methodofadmin: newDrug.methodofadmin,
        quantityinstock: newDrug.quantityinstock,
        reorderlevel: newDrug.reorderlevel,
        costperunit: newDrug.costperunit
      };

      const { data, error } = await supabase
        .from('pharmaceutical_supplies')
        .insert(dataToSave)
        .select();

      if (error) {
        console.error("Error inserting data:", error.message);
        setError(error.message);
        return;
      }

      setDrugs([...drugs, data[0]]);
      setNewDrug({
        drugname: '',
        drugdescription: '',
        drugdosage: '',
        methodofadmin: '',
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
    fetchDrugs();
  }, []);

  async function fetchDrugs() {
    try {
      const { data, error } = await supabase.from('pharmaceutical_supplies').select('*');
      if (error) {
        console.error('Error fetching items:', error.message);
        setError(error.message);
        return;
      }
      setDrugs(data);
      console.log('Fetched items:', data);
    } catch (error) {
      console.error('Error fetching items:', error.message);
      setError(error.message);
    }
  }

  const filteredPharmaceuticalSupplies = drugs.filter((drug) =>
    (typeof drug.drugnumber === 'string' && drug.drugnumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof drug.drugname === 'string' && drug.drugname.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof drug.drugdescription === 'string' && drug.drugdescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof drug.drugdosage === 'string' && drug.drugdosage.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof drug.methodofadmin === 'string' && drug.methodofadmin.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof drug.quantityinstock === 'string' && drug.quantityinstock.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof drug.reorderlevel === 'string' && drug.reorderlevel.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (typeof drug.costperunit === 'string' && drug.costperunit.includes(searchQuery))
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
        <Typography sx={{ m: 0, mr: 'auto', fontSize: '20px' }}>Pharmaceutical Supplies</Typography>
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
            <TableCell>Drug Number</TableCell>
            <TableCell>Drug Name</TableCell>
            <TableCell>Drug Description</TableCell>
            <TableCell>Drug Dosage</TableCell>
            <TableCell>Method of Administration</TableCell>
            <TableCell>Quantity In Stock</TableCell>
            <TableCell>Reorder Level</TableCell>
            <TableCell>Cost Per Unit</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPharmaceuticalSupplies.map((drug) => (
            <TableRow key={drug.drugnumber}>
              <TableCell>{drug.drugnumber} </TableCell>
              <TableCell>{drug.drugname || ''}</TableCell>
              <TableCell>{drug.drugdescription || ''}</TableCell>
              <TableCell>{drug.drugdosage || ''}</TableCell>
              <TableCell>{drug.methodofadmin || ''}</TableCell>
              <TableCell>{drug.quantityinstock || ''}</TableCell>
              <TableCell>{drug.reorderlevel || ''}</TableCell>
              <TableCell>{drug.costperunit || ''}</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() => handleEditClick(drug)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="contained" onClick={handleAddClick}>
          Add Pharmaceutical Supply
        </Button>
      </Box>
      
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isEdit ? 'Edit Pharmaceutical Supply' : 'Add Pharmaceutical Supply'}</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              margin="dense"
              name="drugname"
              label="Drug Name"
              fullWidth
              value={newDrug.drugname}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="drugdescription"
              label="Drug Description"
              fullWidth
              value={newDrug.drugdescription}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="drugdosage"
              label="Drug Dosage"
              fullWidth
              value={newDrug.drugdosage}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="methodofadmin"
              label="Method of Administration"
              fullWidth
              value={newDrug.methodofadmin}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="quantityinstock"
              label="Quantity In Stock"
              fullWidth
              value={newDrug.quantityinstock}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="reorderlevel"
              label="Reorder Level"
              fullWidth
              value={newDrug.reorderlevel}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="costperunit"
              label="Cost Per Unit"
              fullWidth
              value={newDrug.costperunit}
              onChange={handleInputChange}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {isEdit ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
