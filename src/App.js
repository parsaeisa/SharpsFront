import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import signupPage from "./views/pages/signup.page";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">      
      <Route path="/" exact component={signupPage}/>
    </div>
  );
}

export default App;
