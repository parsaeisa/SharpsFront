import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import "../styles/loginSignup.css";
import LoginC from "./component/login";
import SignUp from "./component/signUp";

import { connect } from "react-redux";

import * as loginsignup_actions from "../../core/login_signup/action/loginSignupAction";
import { Layout, Space } from "antd";

const LoginSignup = ({ change, setChange }) => {
  const setMov = (e) => {
    var thePhoto = document.getElementById("signupphoto");
    if (change) {
      thePhoto.classList.add("unchange");
      thePhoto.classList.remove("change");
      setChange(false);
    } else {
      thePhoto.classList.add("change");
      thePhoto.classList.remove("unchange");
      setChange(true);
    }
    var theSignupform = document.getElementById("signupform");
    theSignupform.classList.toggle("signupshow");

    var theLoginform = document.getElementById("loginform");
    theLoginform.classList.toggle("loginhide");
  };

  return (
    <div className="mainDiv">
      
      <div className="loginform" id="loginform">
        <div className="loginpage">
          <LoginC></LoginC>
        </div>
      </div>
      <div className="signupform" id="signupform">
        <div className="signuppage">
          <SignUp></SignUp>
        </div>
      </div>
      <div className="photo_login" id="signupphoto">
        <h1 className="text_header"> Sharp </h1>
        <Button
          onClick={setMov}
          id="mybutton"
          size="large"
          className="buttonMain"
          variant="outlined"
        >
          Start
        </Button>
      </div>
    

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    change: state.login_signup.change,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setChange: (f) => dispatch(loginsignup_actions.setChange(f)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignup);