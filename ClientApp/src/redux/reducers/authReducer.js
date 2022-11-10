import * as actionTypes from "../actions/actionTypes";
import initialStates from "../initialStates"

export const authReducer = (state = initialStates.token ,action) => {
 let newState;
switch (action.type) {
    case actionTypes.LOGIN:
        localStorage.setItem('token',action.payload);
        newState = action.payload;
       return newState;
    case actionTypes.LOGOUT:
        localStorage.removeItem('token');
        return null;
  default:
    return state;
}}