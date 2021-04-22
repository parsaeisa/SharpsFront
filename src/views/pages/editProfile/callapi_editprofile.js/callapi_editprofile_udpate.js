// import { connect } from 'react-redux';
import axios from 'axios' ;
// import store from '../../../../core/store/index' ;
import serverURL from '../../../../utils/serverURL';
import tokenConfig from  '../../../../utils/tokenConfig';



export default function callapi_editprofile_update  (a)  {    
    // const s = store.getState() ;
    // const a = s.UserReducer;
    const ajson = JSON.stringify(a) ;
    axios.put(serverURL() + "user/" , ajson , tokenConfig())
    .then((res) => {
        console.log("updated");
    })
    .catch((e) => {
        console.log(e);
    });
}

// store.subscribe(callapi_editprofile_update);