import { connect } from 'react-redux';
import axios from 'axios' ;
import store from '../../../../core/store/index' ;
import serverURL from '../../../../utils/serverURL';
import tokenConfig from  '../../../../utils/tokenConfig';

store.subscribe(callapi_editprofile);

export default function callapi_editprofile (e) {    
    const s = store.getState() ;
    const a = s.UserReducer;
    const ajson = JSON.stringify(a) ;
    axios.put(serverURL() + "user/" , ajson , tokenConfig())
    .then((res) => {
        console.log("updated");
    })
    .catch((e) => {
        console.log('ridiiii');
    });
}