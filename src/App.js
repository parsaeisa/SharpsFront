import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
 import loginPage from "./views/pages/loginPage";
import editProfile from "./views/pages/editProfile/editprofile";
import React from "react";
import history from "./core/modules/history";
 import LoginSignUp from "./views/pages/loginPage";
import ExplorePage from "./views/pages/explorePage/explorePage" ;
import resetPass from "./views/pages/component/ResetPass";
import verifyEmail from "./views/pages/component/VerifyEmail";
import Dashboard from "./views/pages/Dashboard/Dashboard" ;

import SaveContent from "./views/pages/saveContent/saveContent"
import ViewSaveContent from "./views/pages/saveContent/viewSaveContent"

import ProtectedRoute from "./core/ProtectedRoute";
import { connect } from "react-redux";
import Analytics from "./views/pages/Analytics/Analytics";
const App = ({ logged_in }) => {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/login_signup" exact component={LoginSignUp} />

          <Route path="/" exact component={loginPage} />
          <Route path="/login" exact component={loginPage} />

      
            <Route path="/save" exact component={SaveContent} />
            <Route path="/saved" exact children={<Dashboard />} component={ViewSaveContent} />
          

          <Route path="/profile/edit" exact children={<Dashboard />} component={editProfile} />
          <Route path="/profile/analytics" children={<Dashboard />} exact component={Analytics} />
          <Route path="/explore" exact children={<Dashboard />} component={ExplorePage}/> 


          <Route path="/reset/*" exact component={resetPass} />
          {/* <ProtectedRoute exact path='/' auth={logged_in} unauthLocation="/login_signup" component={} /> */}

          <Route path="/verify_email" exact component={verifyEmail} />
        </Switch>
      </Router>           
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    logged_in: state.login_signup.logged_in,
  };
};

export default connect(mapStateToProps)(App);