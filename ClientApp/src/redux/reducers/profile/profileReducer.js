import * as actionTypes from "../../actions/actionTypes";
import initialStates from "../../initialStates"

export const profileReducer = (state = initialStates.profile,action) => {

switch (action.type) {
    case actionTypes.GET_PROFILE_SUCCESS:
        return action.payload;
    default:
        return state;
}}


