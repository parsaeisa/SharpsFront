import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';





function Login() {

    const [username, setUserName] = useState("");
    const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" })
    const [usernameErr, setUsernameErr] = useState("")
    const [passErr, setPassErr] = useState("")
    

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
            <h3>Login</h3>
            <Form.Group controlId="username">
                <label>Username</label>
                <Form.Control  type="text" placeholder=" username" onKeyPress={(e)=> {e.key === 'Enter' && setUserName(e.target.value)}} onBlur={(e) => validateUsername(e.target.value)}  isInvalid={Boolean(usernameErr)}  />
                <Form.Control.Feedback type="invalid">{usernameErr }</Form.Control.Feedback>
                </Form.Group>

            <FormGroup>
            <label>Password</label>
            <Form.Control type="password" placeholder=" password" isInvalid={Boolean(passErr)} onKeyPress={(e)=> {e.key === 'Enter' && setPasswords({ ...passwords, password: e.target.value })}} onBlur= {(e) => validatePassword(e.target.value)} />
            <Form.Control.Feedback  type="invalid" >{passErr}</Form.Control.Feedback>
           </FormGroup>
            {/* <button type="button" class="btn btn-outline-primary  btn-block">Sign in</button> */}
           
            <Button  block type="submit" variant="primary">Sign in</Button>
             <p className="forgot-password text-right" style={{color:"blue"}}>
            Forgot password?<Link to={{pathname : ""}}></Link>
            </p> 
        </Form>
        </div>
    
    );
}

export default withRouter(Login);
