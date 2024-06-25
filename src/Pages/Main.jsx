import { useState, useEffect } from 'react';
import {
    Grid, Container, Paper, Toolbar, Box, CssBaseline,
    Button, Divider, Table, TableHead, TableRow, TableCell,
    TableContainer, TableBody, Typography, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, InputAdornment
} from '@mui/material';
import { Link } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HotelIcon from '@mui/icons-material/Hotel';
import SearchIcon from '@mui/icons-material/Search';
import supabase from '../Services/Supabase';


const Main = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null);
    const [staff, setStaff] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const [formData, setFormData] = useState({
        staffnumber: '',
        firstname: '',
        lastname: '',
        address: '',
        sex: '',
        dateofbirth: '',
        telnumber: '',
        nin: '',
        position: '',
        currentsalary: '',
        salaryscale: '',
        paidweeklyormonthly: '',
        permanentortemporary: '',
    });

    useEffect(() => {
        fetchStaffs();
    }, []);

    async function fetchStaffs() {
        try {
            const { data, error } = await supabase
                .from('staff')
                .select('*');
            if (error) {
                console.error('Error fetching staff lists:', error.message);
                return;
            }
            setStaff(data);
        } catch (error) {
            console.error('Error fetching staff lists', error.message);
        }
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredStaff = staff.filter((staffRecs) =>
        staffRecs.staffnumber.toString().includes(searchQuery) ||
        staffRecs.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffRecs.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffRecs.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffRecs.sex.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffRecs.dateofbirth.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffRecs.telnumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffRecs.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffRecs.currentsalary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffRecs.salaryscale.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffRecs.paidweeklyormonthly.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staffRecs.permanentortemporary.toLowerCase().includes(searchQuery.toLowerCase()) 


    );

    const handleAddStaffClick = () => {
        setIsEditMode(false);
        setFormData({
            firstname: '',
            lastname: '',
            address: '',
            sex: '',
            dateofbirth: '',
            telnumber: '',
            nin: '',
            position: '',
            currentsalary: '',
            salaryscale: '',
            paidweeklyormonthly: '',
            permanentortemporary: '',
        });
        setOpenDialog(true);
    };

    const handleEditClick = (staff) => {
        setIsEditMode(true);
        setCurrentStaff(staff);
        setFormData(staff);
        setOpenDialog(true);
    };

    const handleDeleteClick = (staff) => {
        setCurrentStaff(staff);
        setConfirmDeleteOpen(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSave = async () => {
        try {
            let result;
            if (isEditMode) {
                // Update existing staff record
                result = await supabase
                    .from('staff')
                    .update(formData)
                    .eq('staffnumber', currentStaff.staffnumber);
            } else {
                // Add new staff record
                result = await supabase
                    .from('staff')
                    .insert([formData]);
            }
    
            console.log('Staff saved successfully:', result);  // Change 'data' to 'result'
            fetchStaffs(); // Refresh staff list
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving staff:', error.message);
        }
    };
    
    const handleDeleteConfirm = async () => {
        try {
            const { data, error } = await supabase
                .from('staff')
                .delete()
                .eq('staffnumber', currentStaff.staffnumber);
            if (error) {
                console.error('Error deleting staff:', error.message);
                return;
            }
            fetchStaffs(); // Refresh staff list
            setConfirmDeleteOpen(false);
        } catch (error) {
            console.error('Error deleting staff:', error.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Container maxWidth="false" sx={{ mt: -5 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', pr: '24px' }}></Toolbar>
                <Grid container spacing={5} justifyContent="flex-start" alignItems="center">
                    <Grid item xs={12}>
                        <Grid container spacing={3} justifyContent="center" alignItems="center">
                           

                            <Grid item xs={3}>
                                <Link to="/dashboard/Patient" style={{ textDecoration: 'none' }}>
                                    <Paper
                                        sx={{
                                            p: 3,
                                            backgroundColor: '#5c6bc0',
                                            '&:hover': { backgroundColor: '#303f9f' },
                                            borderRadius: '5px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        variant="contained"
                                    >
                                        <LocalHospitalIcon style={{ fontSize: 40, color: 'white', marginRight: 10 }} />
                                        <Typography variant="h6" color="white">
                                            Patient
                                        </Typography>
                                    </Paper>
                                </Link>
                            </Grid>

                            <Grid item xs={3}>
                                <Link to="/dashboard/Appointment" style={{ textDecoration: 'none' }}>
                                    <Paper
                                        sx={{
                                            p: 3,
                                            backgroundColor: '#ec407a',
                                            '&:hover': { backgroundColor: '#ad1457' },
                                            borderRadius: '5px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        variant="contained"
                                    >
                                        <EventNoteIcon style={{ fontSize: 40, color: 'white', marginRight: 10 }} />
                                        <Typography variant="h6" color="white">
                                            Book Appointment
                                        </Typography>
                                    </Paper>
                                </Link>
                            </Grid>

                            <Grid item xs={3}>
                                <Link to="/dashboard/Wards" style={{ textDecoration: 'none' }}>
                                    <Paper
                                        sx={{
                                            p: 3,
                                            backgroundColor: '#00897b',
                                            '&:hover': { backgroundColor: '#004d40' },
                                            borderRadius: '5px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        variant="contained"
                                    >
                                        <HotelIcon style={{ fontSize: 40, color: 'white', marginRight: 10 }} />
                                        <Typography variant="h6" color="white">
                                            Wards
                                        </Typography>
                                    </Paper>
                                </Link>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ p: 8, mt: 5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                                    <Typography component="h6" variant="h5" color="inherit">
                                        Staff
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Button variant="contained" color="primary" onClick={handleAddStaffClick}>
                                            Add Staff
                                        </Button>
                                        <TextField
                                            variant="outlined"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{ ml: 2, borderRadius: 1 }}
                                        />
                                    </Box>
                                </Box>

                                <Divider sx={{ mb: 2 }} />

                                <TableContainer>
                                    <Table>
                                        <TableHead   sx={{ p: 30}}>
                                            <TableRow>
                                                <TableCell >Staff Number</TableCell>
                                                <TableCell >First Name</TableCell>
                                                <TableCell >Last Name</TableCell>
                                                <TableCell >Address</TableCell>
                                                <TableCell >Sex</TableCell>
                                                <TableCell >Date of Birth</TableCell>
                                                <TableCell >Tel Number</TableCell>
                                                <TableCell >NIN</TableCell>
                                                <TableCell >Position</TableCell>
                                                <TableCell >Current Salary</TableCell>
                                                <TableCell > Salary Scale</TableCell>
                                                <TableCell >Paid Weekly/Monthly</TableCell>
                                                <TableCell >Permanent/Temporary</TableCell>
                                                <TableCell >
                                                    <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>Actions</Typography>
                                                </TableCell>

                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {filteredStaff.map((staff) => (
                                                <TableRow key={staff.staffnumber}>
                                                    <TableCell >{staff.staffnumber}</TableCell>
                                                    <TableCell >{staff.firstname}</TableCell>
                                                    <TableCell >{staff.lastname}</TableCell>
                                                    <TableCell >{staff.address}</TableCell>
                                                    <TableCell >{staff.sex}</TableCell>
                                                    <TableCell >{staff.dateofbirth}</TableCell>
                                                    <TableCell >{staff.telnumber}</TableCell>
                                                    <TableCell >{staff.nin}</TableCell>
                                                    <TableCell >{staff.position}</TableCell>
                                                    <TableCell >{staff.currentsalary}</TableCell>
                                                    <TableCell >{staff.salaryscale}</TableCell>
                                                    <TableCell >{staff.paidweeklyormonthly}</TableCell>
                                                    <TableCell >{staff.permanentortemporary}</TableCell>
                                                    <TableCell >
                                                     <Box sx={{ display: 'flex', gap: 1 }}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => handleEditClick(staff)}
                                                        
                                                            sx={{ mr: 1 }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={() => handleDeleteClick(staff)}
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
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{isEditMode ? 'Edit Staff' : 'Add Staff'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            
                            margin="dense"
                            name="staffnumber"
                            label="Staff Number"
                            type="number"
                            fullWidth
                            value={formData.staffnumber}
                            onChange={handleChange}
                            disabled
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="firstname"
                            label="First Name"
                            type="text"
                            fullWidth
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="lastname"
                            label="Last Name"
                            type="text"
                            fullWidth
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="address"
                            label="Address"
                            type="text"
                            fullWidth
                            value={formData.address}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="sex"
                            label="Sex"
                            type="text"
                            fullWidth
                            value={formData.sex}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="dateofbirth"
                            type="date"
                            fullWidth
                            value={formData.dateofbirth}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="telnumber"
                            label="Tel Number"
                            type="text"
                            fullWidth
                            value={formData.telnumber}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="nin"
                            label="NIN"
                            type="text"
                            fullWidth
                            value={formData.nin}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="position"
                            label="Position"
                            type="text"
                            fullWidth
                            value={formData.position}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="currentsalary"
                            label="Current Salary"
                            fullWidth
                            value={formData.currentsalary}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="salaryscale"
                            label="Salary Scale"
                            type="text"
                            fullWidth
                            value={formData.salaryscale}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="paidweeklyormonthly"
                            label="Paid Weekly/Monthly"
                            type="text"
                            fullWidth
                            value={formData.paidweeklyormonthly}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="permanentortemporary"
                            label="Permanent/Temporary"
                            type="text"
                            fullWidth
                            value={formData.permanentortemporary}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={handleCloseDialog} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to delete this staff member?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteConfirm} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default Main;