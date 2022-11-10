import * as actionTypes from "./actionTypes";


export const filter = (articleFilter) => ({
    type:actionTypes.CHANGE_ARTICLE_FILTER,
    payload:articleFilter                       
 }) 

 export const setFilterResult = (apiResult) => ({
    type:actionTypes.SET_FILTER_RESULT_SUCCESS,
    payload:apiResult                       
 }) 