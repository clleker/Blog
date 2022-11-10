import * as actionTypes from "../../actions/actionTypes";
import initialStates from "../../initialStates"

export const tagListReducer = (state = initialStates.tags,action) => {

switch (action.type) {
    case actionTypes.GET_TAGS_SUCCESS:
        return action.payload;
    default:
        return state;
}}