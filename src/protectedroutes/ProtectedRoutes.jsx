import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  let token = localStorage.getItem("token");
  try {
    const decodedtoken = jwtDecode(token);
    //console.log(decodedtoken);
    if (decodedtoken) return children;
  } catch (error) {
    console.log("error");
    localStorage.clear();
    return <Navigate to="/signin" />;
  }
}
