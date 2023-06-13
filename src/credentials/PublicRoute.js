import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  //children is destructured from the props
  if (localStorage.getItem("token")) {
    //then return to the home
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
