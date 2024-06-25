/*
import React, { useState } from 'react'
//import './LoginPage.css';
//import { FaUser, FaLock } from "react-icons/fa";
import {Container, Box, TextField, Button, Typography} from '@mui/material';


const LoginPage = () => {

    const [action, setAction] = useState('');
    const registerLink = () => {
        setAction(' active');
    };
    const loginLink = () => {
        setAction('');
    };
  return (
    <div className={`container${action}`}>
        <div className="formBoxLogin">
            <form action="">
                <h1>Login</h1>
                <div className="inputBox">
                    <input type ="text" placeholder='Username' required /> 
                         
                </div>
                <div className="inputBox">
                    <input type ="password" placeholder='Password' required />
                              
                </div>
                <div className="rememberForgot">
                    <label><input type ="checkbox"/> Remember Me</label>
                    <a href="#">Forgot Password?</a>

                </div>
                    <button type="submit">Login</button>
                <div className="registerLink">
                    <p>Don't have an account?
                    <a href="#" onClick={registerLink}> Register</a></p>
                </div>
            </form>
        </div>
        
        <div className="formBoxReg">
            <form action="">
                <h1>Registration</h1>
                <div className="inputBox">
                    <input type ="text" placeholder='Username' required /> 
                     
                </div>
                <div className="inputBox">
                    <input type ="email" placeholder='Email' required /> 

                </div>
                <div className="inputBox">
                    <input type ="password" placeholder='Password' required />
                    
                </div>
                <div className="rememberForgot">
                    <label><input type ="checkbox"/> I agree to the terms and conditions</label>

                </div>
                    <button type="submit">Register</button>
                <div className="registerLink">
                    <p>Already have an account?
                    <a href="#" onClick={loginLink}> Login</a></p> 
                </div>
            </form>
        </div>

    </div>
  )
}


export default LoginPage;

//Login page nga name every mag kuan click 

*/