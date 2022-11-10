import * as actionTypes from "../../actions/actionTypes";
import initialStates from "../../initialStates"

export const socialMediaListReducer = (state = initialStates.socialMedia,action) => {

switch (action.type) {
    case actionTypes.GET_SOCIALMEDIA_SUCCESS:
        return action.payload;
    default:
        return state;
}}