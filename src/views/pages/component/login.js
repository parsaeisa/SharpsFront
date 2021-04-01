import axios from "axios";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, FormText, InputGroup } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../../styles/loginSignup.css';
import serverURL from '../../../utils/serverURL';

function Login() {

    const [username, setUserName] = useState("");
    const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" })
    const [usernameErr, setUsernameErr] = useState("")
    const [passErr, setPassErr] = useState("")
    
    const Login = e => {

        e.preventDefault();               

        const out = {
            'username' : username ,
            'password' : passwords 
        }

        const outJSON = JSON.stringify(out)

        axios.post(serverURL()+"user/login", outJSON )
        .then(result => {
            console.log("logged In");
            console.log(result);
            localStorage.setItem('token' , result.data.token);
            
            // add returned data to store
        }).catch(error => {                
            console.log("not logged In");
        })

    }

    function validateUsername(newValue) {
        setUserName(newValue);
        let userError = ""
        if ( newValue.length === 0) {
            userError = "Enter your username.";
        }
        setUsernameErr( userError )
    }
    function validatePassword(pass){
        setPasswords({ ...passwords, password: pass })
        let userError = ""
        if (pass.length === 0) {
            userError = "Enter your password.";
        }
        setPassErr(userError)
    }
    const ErrorsOnSubmit = async () => {
        validateUsername(username)
        validatePassword(passwords.password)
        if( !!(usernameErr) || !!(passErr) ) 
            return;
    }
   
    return (

        <div className="row justify-content-center">
          
        <Form onSubmit={(e) => { e.preventDefault(); }}>
            {/* <h3>Login</h3> */}
            <Form.Group controlId="username">
                {/* <label>Username</label> */}
                <Form.Control className="loginforms" type="text" placeholder=" Username" onKeyPress={(e)=> {e.key === 'Enter' && setUserName(e.target.value)}} onBlur={(e) => validateUsername(e.target.value)}  isInvalid={Boolean(usernameErr)}  />
                <Form.Control.Feedback type="invalid">{usernameErr }</Form.Control.Feedback>
                </Form.Group>

            <FormGroup>
            {/* <label>Password</label> */}
            <Form.Control className="loginforms" type="password" placeholder=" Password" isInvalid={Boolean(passErr)} onKeyPress={(e)=> {e.key === 'Enter' && setPasswords({ ...passwords, password: e.target.value })}} onBlur= {(e) => validatePassword(e.target.value)} />
            <Form.Control.Feedback  type="invalid" >{passErr}</Form.Control.Feedback>
           </FormGroup>
            {/* <button type="button" class="btn btn-outline-primary  btn-block">Sign in</button> */}
           
            <button onClick={Login} className="loginB">Login</button>
             <p className="forgotpassword" >
            Forgot password?<Link to={{pathname : ""}}></Link>
            </p> 
        </Form>
        </div>
    
    );
}

export default withRouter(Login);
