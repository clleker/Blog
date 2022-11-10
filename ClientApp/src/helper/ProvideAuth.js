import React from "react";
import {
  Route,
  Navigate,
} from "react-router-dom";
import { isLogin } from "../api/auth-api";


export const PrivateRoute = ({ children, ...rest } ) => {
  let auth = isLogin();
  return (
    <Route path="/"
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Route
            element={<Navigate 
             to={{
              pathname: "/",
              state: { from: location }
            }} replace />}
           
          />
        )
      }
      />
  );
}


