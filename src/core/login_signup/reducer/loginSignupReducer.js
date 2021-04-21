import {ActionTypes} from "../action/loginSignupActionTypes";
import axios from 'axios';

const initialstate = { 
  change: false,
  forgotPassM: false,

}
export default (state = initialstate, { type, payload }) => {
    switch (type) {
     
      case ActionTypes.SET_CHANGE:
        return{
          ...state, 
          change : payload.change,
      }; 
      case ActionTypes.SET_FORGOTPASSM:
        return{
          ...state, 
          forgotPassM : payload.forgotPassM,
      };    
            
    default : return state;

    }
}