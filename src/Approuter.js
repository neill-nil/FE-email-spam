import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
export default function Approuter() {
  return (
    <BrowserRouter>
      <Routes>
       {["/","/login"].map(path=><Route path={path} element={<LoginPage />}/>)}
       <Route path="/signup" element={<SignupPage/>} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="*" element={<h1>404!!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
