import axios from 'axios' ;
import serverURL from '../../../../utils/serverURL';
import tokenConfig from  '../../../../utils/tokenConfig';

export default function callapi_editprofile_deactivate () {        

    axios.get(serverURL() + "user/"  , tokenConfig())
    .then((res) => {    
        console.log("deleted");            
        store.dispatch(actions.setState(res.data))
        // add a redirect
    })
    .catch((e) => {
        console.log(e);
    });    

}