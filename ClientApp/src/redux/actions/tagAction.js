import * as actionTypes from "./actionTypes";
import * as apiTag from "../../api/tag-api";

export const getTagsSuccess = (tag) => ({
    type:actionTypes.GET_TAGS_SUCCESS,
    payload:tag                       
  }) 
  
  export const getTags = () => {
    return function(dispatch){
        apiTag.getListForWeb().then((result) => {
            dispatch(getTagsSuccess(result.data));
          });
        }
  }