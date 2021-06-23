import axios from 'axios' ;
import serverURL from './utils/serverURL';
import tokenConfig from  './utils/tokenConfig';

export default function callapi_user_history_enter (json) {        
    
    const ajson = JSON.stringify(json)
    console.log(ajson);
    
    axios.post(serverURL() + "userHistory" , ajson  , tokenConfig())
    .then((response) => {
        console.log("succesfull");
    })    
    .catch((e) => {
        console.log(e);
    });        

}
