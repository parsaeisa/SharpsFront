
import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import history from "./core/modules/history";
import LoginSignUp from "./views/pages/loginPage";

import {connect} from 'react-redux';
const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login_signup" exact component={LoginSignUp} />
      </Switch>
    </Router>
  );
};

export default App;
