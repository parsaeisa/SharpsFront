import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import "../styles/loginSignup.css";
import LoginC from "./component/login";
import SignUp from "./component/signUp";

import { connect } from "react-redux";

import * as loginsignup_actions from "../../core/login_signup/action/loginSignupAction";

const LoginSignup = ({ change, setChange, setAlertS }) => {
  const setMov = (e) => {
    var thePhoto = document.getElementById("signupphoto");
    if (change) {
      thePhoto.classList.add("unchange");
      thePhoto.classList.remove("change");
      setChange(false);
      setAlertS(false);
    } else {
      thePhoto.classList.add("change");
      thePhoto.classList.remove("unchange");
      setChange(true);
      setAlertS(false);
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

    alertS: state.login_signup.alertS,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setChange: (f) => dispatch(loginsignup_actions.setChange(f)),

    setAlertS: (f) => dispatch(loginsignup_actions.setAlertS(f)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignup);
