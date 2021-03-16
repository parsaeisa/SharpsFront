import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import history from "./core/modules/history";
import LoginSignUp from "./views/pages/LoginSignUp/LoginSignUp";

import {connect} from 'react-redux';
const App = ({logged_in}) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login_signup" exact component={LoginSignUp} />
      </Switch>
    </Router>
  );
};

export default App;
