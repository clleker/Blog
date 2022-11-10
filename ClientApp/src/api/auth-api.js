import { request } from "../../src/api/api";


export async function login(user) {
    return await request(`auth/login`, 'POST',user);
}

export  function saveUserLogin(token){
  localStorage.setItem("token",token);
}

export function isLogin(){
     debugger;
     const token = localStorage.getItem("token");
     return token ? true : false;
}