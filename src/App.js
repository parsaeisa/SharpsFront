import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import loginPage from "./views/pages/loginPage";

function App() {
  return (
    <div className="App"> 
      <Route path="/" exact component={loginPage}/>               
      <Route path="/login" exact component={loginPage}/>      
    </div>
  );
}

export default App;
