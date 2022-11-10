
import * as actionTypes from "./actionTypes";
import * as apiUser from "../../api/user-api";

export const getProfileSuccess = (profile) => ({
    type:actionTypes.GET_PROFILE_SUCCESS,
    payload:profile                       
  }) 
  
  export const getProfile = () => {
    return function(dispatch){
        apiUser.get().then((result) => {
            dispatch(getProfileSuccess(result.data));
          });
        }
  }
