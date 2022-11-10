import * as actionTypes from "../../actions/actionTypes";
import initialStates from "../../initialStates"

export const changeArticleFilterReducer = (state = initialStates.articleFilter,action) => {

switch (action.type) {
    case actionTypes.CHANGE_ARTICLE_FILTER:
        return action.payload;
    default:
        return state;
}}