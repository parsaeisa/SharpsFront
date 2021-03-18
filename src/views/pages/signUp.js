import React, { Component } from "react";
import {  Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
import { Link,  withRouter } from 'react-router-dom';

function SignUp(e) {

    return (
      
        <div className="row justify-content-center">
        <Form onSubmit={(e) => { e.preventDefault() }} >
            <h3>SignUp</h3>

            <Form.Group controlId="username">
                <label>UserName</label>
                <Form.Control type="text" placeholder="username" />
                
            </Form.Group>

            <div className="form-group">
                <label>Email Address</label>
                <Form.Control type="email" placeholder="email"  />
                
            </div>

            <div className="form-group">
                <label>Password</label>
                <Form.Control type="password" placeholder="password" />
               
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <Form.Control type="password" placeholder="confirm password"  />
            </div>
            <button type="button" class="btn btn-outline-primary  btn-block">SignUp</button>
        </Form>
        </div>
       
    );
}

export default withRouter(SignUp);
