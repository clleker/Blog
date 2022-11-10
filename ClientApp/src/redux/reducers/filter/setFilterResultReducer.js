import * as actionTypes from "../../actions/actionTypes";
import initialStates from "../../initialStates"

export const setFilterResultReducer = (state = initialStates.filterResult,action) => {
switch (action.type) {
    case actionTypes.SET_FILTER_RESULT_SUCCESS:
        return action.payload;
    default:
        return state;
}}