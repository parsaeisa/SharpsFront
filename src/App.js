import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import loginPage from "./views/pages/loginPage";
import editProfile from "./views/pages/editProfile/editprofile";
import React from "react";
import history from "./core/modules/history";
import LoginSignUp from "./views/pages/loginPage";

import { connect } from "react-redux";
const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/login_signup" exact component={LoginSignUp} />

          <Route path="/" exact component={loginPage} />
          <Route path="/login" exact component={loginPage} />
          <Route path="/edit_profile" exact component={editProfile} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
