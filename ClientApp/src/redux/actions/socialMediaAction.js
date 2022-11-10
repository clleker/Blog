import * as actionTypes from "./actionTypes";
import * as apiSocialMedia from "../../api/socialmedia-api";

export const getSocialMediaSuccess = (socialMedia) => ({
    type:actionTypes.GET_SOCIALMEDIA_SUCCESS,
    payload:socialMedia                       
  }) 
  
  export const getSocialMedia = () => {
    return function(dispatch){
        apiSocialMedia.getList().then((result) => {
            dispatch(getSocialMediaSuccess(result.data));
          });
        }
  }