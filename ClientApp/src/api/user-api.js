import { request, uploadFile } from "../../src/api/api";


export async function uploadImage(image) {
    return await uploadFile(`user/UpdateUserImage`, "POST", image);
  }

  export async function get() {
    return await request(`user/get`, "GET");
  }

  export async function update(user) {
    return await request(`user/updateUser`, "POST", user);
  }

  export async function login(_username, _password) {

    const user = {username:_username, password:_password};
    
    return await request(`auth/login`, "POST", user)
}

export  const saveUserLogin = (token) =>{
localStorage.setItem("token",token);
}

export const isLogin = () => {
   const token = localStorage.getItem("token");
   const test = token ? true : false ;
   debugger;
   return token ? true : false ;
}

