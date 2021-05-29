import axios from 'axios' ;
import serverURL from '../../../../utils/serverURL';
import tokenConfig from  '../../../../utils/tokenConfig';

export default function callapi_explore_search (searched , searchmode) {        
            
    const promise = axios.get(serverURL() + "content/search"  , tokenConfig());

    const dataPromise = 
    promise.then((response) => response.data)    
    .catch((e) => {
        console.log(e);
    });    

    return dataPromise ;

}
