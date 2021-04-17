import {ActionTypes} from "./loginSignupActionTypes"

export function setChange(state){
    return {
        type : ActionTypes.SET_CHANGE,
        payload: { change: state },
    };
}