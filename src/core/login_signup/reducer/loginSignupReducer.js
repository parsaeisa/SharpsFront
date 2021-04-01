import {ActionTypes} from "../action/loginSignupActionTypes";
import axios from 'axios';

const initialstate = { 
  change: false,
}
export default (state = initialstate, { type, payload }) => {
    switch (type) {
     
      case ActionTypes.SET_CHANGE:
        return{
          ...state, 
          change : payload.change,
      };    
            
    default : return state;

    }
}