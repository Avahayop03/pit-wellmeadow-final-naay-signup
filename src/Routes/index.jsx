import React from 'react';
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import Main from "../Pages/Main";
import PatientMedication from "../Pages/PatientMedication";
import Wards from "../Pages/Wards";
import Patient from "../PatientsPages/Patient";
import Appointment from "../Pages/Appointment";
import OutPatient from "../PatientsPages/OutPatient";
import WaitingLists from "../PatientsPages/WaitingLists";
import CurrentInPatient from "../PatientsPages/CurrentInPatient";
import PrivateRoute from '../Components/PrivateRoute';
import PatientLists from "../PatientsPages/PatientLists";
import StaffAllocation from "../Pages/StaffAllocation";
import LocalDoctors from '../Pages/LocalDoctors';
import HomePage from '../Pages/HomePage';
import StocksMain from '../StocksSupplies/StocksMain';
import SurgicalNonSurgical from '../StocksSupplies/SurgicalNonSurgical';
import Pharmaceutical from '../StocksSupplies/Pharmaceutical';
import Suppliers from '../StocksSupplies/Suppliers';
import SignUp from '../Pages/SignUp';





const routes = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/login",
    element: <Login />
  },

  
  {
    path: "/signup",
    element:<SignUp/>

  },
  
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "patientMed",
        element: <PatientMedication />
      },
      {
        path: "staffAlloc",
        element: <StaffAllocation />
      },
      {
        path: "wards",
        element: <Wards />
      },
      {
        path: "appointment",
        element: <Appointment />
      },
      {
        path: "patient",
        element: <Patient />,
        children: [
          {
            index: true,
            element: <PatientLists />
          },
          {
            path: "outPatient",
            element: <OutPatient />
          },
          {
            path: "waitingLists",
            element: <WaitingLists />
          },
          {
            path: "currentInPatient",
            element: <CurrentInPatient />
          }
        ]
      },
      {
        path: "localDoctors",
        element: <LocalDoctors />
      },
      {
        path: "stocks",
        element: <StocksMain />,
        children: [
           
          {
            index:true,
            element: <SurgicalNonSurgical />
          },
          {
            path: "pharmaceutical",
            element: <Pharmaceutical />
          },
          {
            path: "suppliers",
            element: <Suppliers />
          }
        ]
      }
    ]
  }
];

export default routes;
