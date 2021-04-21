import axios from "axios";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import ForgotPassModal from "./ForgotPassModal";
import serverURL from "../../../utils/serverURL";
import tokenConfig from "../../../utils/tokenConfig";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";

import * as loginsignup_actions from "../../../core/login_signup/action/loginSignupAction";

import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "../../styles/loginSignup.css";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import ForwardToInbox from "@material-ui/icons/Send";
import MarkEmailRead from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -1.5,
    left: -1.5,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
const LoginC = ({ forgotPassM, setforgotPassM }) => {
  const [username, setUserName] = useState("");
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [usernameErr, setUsernameErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const Login = (e) => {
    e.preventDefault();

    const out = {
      username: username,
      password: passwords.password,
    };

    const outJSON = JSON.stringify(out);

    axios
      .post(serverURL() + "user/login", outJSON, tokenConfig())
      .then((result) => {
        console.log("logged In");
        console.log(result);
        localStorage.setItem("token", result.data.token);

        // add returned data to store
        history.push("/edit_profile");
      })
      .catch((error) => {
        console.log(error.response);
        console.log("not logged In");
      });
  };

  function validateUsername(newValue) {
    setUserName(newValue);
    let userError = "";
    if (newValue.length === 0) {
      userError = "Enter your username.";
    }
    setUsernameErr(userError);
  }
  function validatePassword(pass) {
    setPasswords({ ...passwords, password: pass });
    let userError = "";
    if (pass.length === 0) {
      userError = "Enter your password.";
    }
    setPassErr(userError);
  }
  const ErrorsOnSubmit = async () => {
    validateUsername(username);
    validatePassword(passwords.password);
    if (!!usernameErr || !!passErr) return;
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const handleSubmit = () => {
    if(email==""){
      validateEmail(email);
    }else{
    if (!emailErr) {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = window.setTimeout(() => {
          setSuccess(true);
          setLoading(false);
          setOpen(false);
        }, 2000);
        
      }
                   
  
      const out = { 
          "email" : email 
      }
  
      const outJSON = JSON.stringify(out);
    axios.post(serverURL()+"user/resetpassword", outJSON , tokenConfig())
    .then(result => {
        console.log("email sent");
        console.log(result);
        localStorage.setItem('token' , result.data.token);
        
        history.push("/login_signup");
        
      window.location.reload();

    }).catch(error => {       
        console.log(error.response);         
        console.log("email not sent");
    })
    }}
   
  };
  const validemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  function validateEmail(email) {
    setEmail(email);
    let userError = "";

    if (!validemail.test(String(email).toLowerCase())) {
      userError = "Invalid email address!";
    }
    setEmailErr(userError);
  }

  
  return (
    <div className="row justify-content-center">
      <Form
        className="centered"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* <h3>Login</h3> */}
        <Form.Group controlId="username">
          {/* <label>Username</label> */}
          <Form.Control
            className="loginforms"
            type="text"
            placeholder=" Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            onBlur={(e) => validateUsername(e.target.value)}
            isInvalid={Boolean(usernameErr)}
          />
          <Form.Control.Feedback type="invalid">
            {usernameErr}
          </Form.Control.Feedback>
        </Form.Group>

        <FormGroup>
          {/* <label>Password</label> */}
          <Form.Control
            className="loginforms"
            type="password"
            placeholder=" Password"
            isInvalid={Boolean(passErr)}
            onChange={(e) => {
              setPasswords({ ...passwords, password: e.target.value });
            }}
            onBlur={(e) => validatePassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {passErr}
          </Form.Control.Feedback>
        </FormGroup>

        <button onClick={Login} className="loginB">
          Login
        </button>
        <p onClick={handleClickOpen} className="forgotpassword">
          Forgot password?
        </p>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          className="forgotPasswordM"
        >
          <DialogTitle id="form-dialog-title">
            Forgot your password?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To set a new password, please enter your email address here. We
              will send you a link.
            </DialogContentText>
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
            /> */}
            <Form.Control
          type="email"
          placeholder="Email"
          onChange={(e) => { validateEmail(e.target.value);
          }}
          onBlur={(e) => validateEmail(e.target.value)}
          isInvalid={Boolean(emailErr)}
        />
        <Form.Control.Feedback type="invalid">
          {emailErr}
        </Form.Control.Feedback>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {/* <Button onClick={handleSubmit} color="primary">
              Email me
            </Button> */}
            <div className={classes.root}>
              <div className={classes.wrapper}>
                <Fab
                  aria-label="save"
                  color="primary"
                  className={buttonClassname}
                  onClick={handleSubmit}
                >
                  {success ? <MarkEmailRead /> : <ForwardToInbox />}
                  {loading && (
                    <CircularProgress
                      size={60}
                      className={classes.fabProgress}
                    />
                  )}
                </Fab>
              </div>
              {/* 
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  className={buttonClassname}
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  Email me
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div> */}
            </div>
          </DialogActions>
        </Dialog>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    forgotPassM: state.login_signup.forgotPassM,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setforgotPassM: (av) => dispatch(loginsignup_actions.setforgotPassM(av)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginC);
