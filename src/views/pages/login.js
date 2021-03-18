import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

function Login() {
   
    return (
        <div className="row justify-content-center">
        <Form onSubmit={(e) => { e.preventDefault(); }}>
            <h3>Login</h3>

            <Form.Group controlId="username">
                <label>UserName</label>
                <Form.Control type="text" placeholder=" username" />
              
            </Form.Group>

            <div className="form-group">
                <label>Password</label>
                <Form.Control type="password" placeholder=" password" />
            </div>
            <button type="button" class="btn btn-outline-primary  btn-block">Sign in</button>
           
             <p className="forgot-password text-right" style={{color:"blue"}}>
            Forgot password?<Link to={{pathname : "/sign-up" }}></Link>
            </p> 
        </Form>
        </div>
    );
}

export default Login;
