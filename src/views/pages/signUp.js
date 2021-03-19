import React, { Component } from "react";
import { useState} from "react";
import {  Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
import { Link,  withRouter } from 'react-router-dom';

function SignUp(e) {

    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" })
    const [usernameErr, setUsernameErr] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [passErr, setPassErr] = useState("")
    const [confirmPassErr, setConfirmPassErr] = useState("")
  

    function validateUsername(newValue) {
        setUserName(newValue);
        let userError = ""
        if ( newValue.length === 0) {
            userError = " Enter a unique username.";
        }
        setUsernameErr( userError )
    }

    const validemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function validateEmail(email) {
        setEmail(email);
        let userError = ""
        
        if( !validemail.test(String(email).toLowerCase())){
            userError = "Invalid email address.";
        }
        setEmailErr(userError);
    }
    const validpass = /^((?=.*[0-9]{1,})|(?=.*[!.@#$&*-_]{1,}))(?=.*[a-z]{1,}).{8,}$/;

    function validatePassword(pass){
        setPasswords({ ...passwords, password: pass })
        let userError = ""
        if (pass.length < 8) {
            userError = "Password must be 8 characters long.";
          }
        else if (!validpass.test(String(pass).toLowerCase())) {
            userError = "Invalid password.";
        }
       
        setPassErr(userError)
    }
   
    function validateConfirmPassword(cpass){
        setPasswords({ ...passwords, confirmPassword: cpass })
        let userError = ""
        if (passwords.password !== cpass) {
            userError = "It doesn't match the password!"
        }
        setConfirmPassErr(userError)
    }
    const ErrorsOnSubmit = async () => {
        validateUsername(username)
        validateEmail(email)
        validatePassword(passwords.password)
        validateConfirmPassword(passwords.confirmPassword)
        if(Boolean(usernameErr) || Boolean(emailErr) || Boolean(passErr) || Boolean(confirmPassErr))
            return;
    }

    return (
      
        <div className="row justify-content-center">
        <Form onSubmit={(e) => { e.preventDefault() }} >
            <h3>SignUp</h3>
            <Form.Group controlId="username">
                <label>UserName</label>
                <Form.Control type="text" placeholder="username" onKeyPress={(e)=> {e.key === 'Enter' && validateUsername(e.target.value)}} onBlur={(e) => validateUsername(e.target.value)} isInvalid={Boolean(usernameErr)} />
                <Form.Control.Feedback type="invalid">{usernameErr }</Form.Control.Feedback>
            </Form.Group>

            <div className="form-group">
                <label>Email Address</label>
                <Form.Control type="email" placeholder="email" onKeyPress={(e)=> {e.key === 'Enter' && validateEmail(e.target.value)}} onBlur={(e) => validateEmail(e.target.value)} isInvalid={Boolean(emailErr)} />
                <Form.Control.Feedback type="invalid">{emailErr}</Form.Control.Feedback>
                
            </div>

            <div className="form-group">
                <label>Password</label>
                <Form.Control type="password" placeholder="password" isInvalid={Boolean(passErr)} onKeyPress={(e)=> {e.key === 'Enter' && validatePassword(e.target.value)}} onBlur= {(e) => validatePassword(e.target.value)}/>
                <Form.Control.Feedback type="invalid">{passErr}</Form.Control.Feedback>
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <Form.Control type="password" placeholder="confirm password" isInvalid={Boolean(confirmPassErr)} onKeyPress={(e)=> {e.key === 'Enter' && validateConfirmPassword(e.target.value)}} onBlur={(e) => validateConfirmPassword(e.target.value)} />
                <Form.Control.Feedback type="invalid">{confirmPassErr}</Form.Control.Feedback>
            </div>
            <Button  block type="submit" variant="primary">Sign UP</Button>
        </Form>
        </div>
       
    );
}

export default withRouter(SignUp);
