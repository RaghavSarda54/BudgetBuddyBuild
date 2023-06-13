import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
   
  
    //get user function
    //eslint-disable-next-line
    const getUser = async () => {
      try {
     
        //verifying our token
        const res = await axios.post(
          "/api/user/getUserData",
          { token: localStorage.getItem("token") },
          {
            headers: {
              //targetting the Authorization
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        
        //now checking if we get the user or not by checking the data in the response res
        if (res.data.success) {
          //dispatching the created setUser in the userSlice
          dispatch(setUser(res.data.data)); //telling which user is there by response res
        } //here user in above comment means the email and password which is stored in the
        //data object in the userCtrl
        else {
          //if there is token issue then navigating
          <Navigate to="/login" />;
          //also clearing the localStorage(like clearing the token)
          localStorage.clear();
        }
      } catch (error) {
        
        localStorage.clear(); //also clring the localStorage in the erro scenario bcz we don't
        //want that any token remains so now that the token is clear then he won't be able to
        //access the home page
        console.log(error);
      }
    };
  
    //getting the user in the initial time by the useEffect hook
    useEffect(() => {
      if (!user) {
        //not getting the user then call the function getUser
        getUser();
      }
    }, [user, getUser]); //due to error adding getUser in the dependency also
  
    //conditionally returning the
    if (localStorage.getItem("token")) {
      //then return the subelement via props as:
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }