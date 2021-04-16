import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import loginPage from "./views/pages/loginPage";
import editProfile from "./views/pages/editProfile/editprofile" ;
import ExplorePage from "./views/pages/explorePage/expplorePage" ;

function App() {
  return (
    <div className="App"> 
      <Route path="/" exact component={loginPage}/>               
      <Route path="/login" exact component={loginPage}/>      
      <Route path="/edit_profile" exact component={editProfile} />
      <Route path="/" exact component={ExplorePage}/>          
    </div>
  );
}

export default App;
