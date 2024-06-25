import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link } from 'react-router-dom';
import { FaPills } from 'react-icons/fa';

export default function MainListItems() {
  return (
    <React.Fragment>
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <ListItemButton
          sx={{
            '&:hover': {
              backgroundColor: '#1976d2',
              '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: '#fff', // Change icon and text color to white on hover
              },
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} /> {/* Greyish color */}
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: 'rgba(0, 0, 0, 0.54)' }} /> {/* Greyish color */}
        </ListItemButton>
      </Link>

      <Link to="/dashboard/staffAlloc" style={{ textDecoration: 'none' }}>
        <ListItemButton
          sx={{
            '&:hover': {
              backgroundColor: '#1976d2',
              '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: '#fff', // Change icon and text color to white on hover
              },
            },
          }}
        >
          <ListItemIcon>
            <PeopleIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} /> {/* Greyish color */}
          </ListItemIcon>
          <ListItemText primary="Staff Allocation" sx={{ color: 'rgba(0, 0, 0, 0.54)' }} /> {/* Greyish color */}
        </ListItemButton>
      </Link>

      <Link to="/dashboard/patientMed" style={{ textDecoration: 'none' }}>
        <ListItemButton
          sx={{
            '&:hover': {
              backgroundColor: '#1976d2',
              '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: '#fff', // Change icon and text color to white on hover
              },
            },
          }}
        >
          <ListItemIcon>
            <FaPills style={{ color: 'rgba(0, 0, 0, 0.54)' }} /> {/* Greyish color */}
          </ListItemIcon>
          <ListItemText primary="Patient Medication" sx={{ color: 'rgba(0, 0, 0, 0.54)' }} /> {/* Greyish color */}
        </ListItemButton>
      </Link>

      <Link to="/dashboard/localDoctors" style={{ textDecoration: 'none' }}>
        <ListItemButton
          sx={{
            '&:hover': {
              backgroundColor: '#1976d2',
              '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: '#fff', // Change icon and text color to white on hover
              },
            },
          }}
        >
          <ListItemIcon>
            <LocalHospitalIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} /> {/* Greyish color */}
          </ListItemIcon>
          <ListItemText primary="Local Doctors" sx={{ color: 'rgba(0, 0, 0, 0.54)' }} /> {/* Greyish color */}
        </ListItemButton>
      </Link>

      <Link to="/dashboard/stocks" style={{ textDecoration: 'none' }}>
        <ListItemButton
          sx={{
            '&:hover': {
              backgroundColor: '#1976d2',
              '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: '#fff', // Change icon and text color to white on hover
              },
            },
          }}
        >
          <ListItemIcon>
            <InventoryIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} /> {/* Greyish color */}
          </ListItemIcon>
          <ListItemText primary="Stocks and Supplies" sx={{ color: 'rgba(0, 0, 0, 0.54)' }} /> {/* Greyish color */}
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
}
