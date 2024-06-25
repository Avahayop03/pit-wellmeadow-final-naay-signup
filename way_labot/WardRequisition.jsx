import React, { useState } from 'react';
import { Paper, Button, Container, TextField, InputAdornment, Divider,
    Box, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function WardRequisition() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility

  const handleSearch = (event) => {
    // Implement search functionality here
    const searchQuery = event.target.value;
    console.log('Searching for:', searchQuery);u
    // You can perform further actions based on the searchQuery
  };

  const handleAddClick = () => {
    setOpenDialog(true); // Open dialog for adding new requisition
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close dialog
  };

  const handleSave = () => {
    // Implement save functionality for the dialog form
    console.log('Saving new requisition...');
    handleCloseDialog(); // Close dialog after saving
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
            <Typography sx={{ m: 0, mr: 'auto', fontSize: '20px' }}>Ward Requisitions</Typography>
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
          <Divider sx={{ mb: 50 }} />
          {/* Other content related to ward requisitions */}
        </Paper>
      </Grid>

      {/* Dialog for Add functionality */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add Ward Requisition</DialogTitle>
        <DialogContent>
          {/* Add form fields or content for adding new requisition */}
          <TextField fullWidth variant="outlined" label="Requisition Name" sx={{ mb: 2 }} />
          <TextField fullWidth variant="outlined" label="Quantity" sx={{ mb: 2 }} />
          <TextField fullWidth variant="outlined" label="Description" multiline rows={4} sx={{ mb: 2 }} />
          {/* Add more fields as needed */}
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
