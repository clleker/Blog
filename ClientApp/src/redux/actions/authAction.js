import * as actionTypes from "./actionTypes";


export const login = (_payload) => ({
  type:actionTypes.LOGIN,
  payload:_payload                       
}) 

export const logout = () => ({
    type:actionTypes.LOGOUT,
  }) 