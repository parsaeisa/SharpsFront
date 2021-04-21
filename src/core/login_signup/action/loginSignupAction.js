import {ActionTypes} from "./loginSignupActionTypes"

export function setChange(state){
    return {
        type : ActionTypes.SET_CHANGE,
        payload: { change: state },
    };
}

export function setforgotPassM(state){
    return {
        type : ActionTypes.SET_FORGOTPASSM,
        payload: { forgotPassM: state },
    };
}