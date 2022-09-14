import React, { useState } from "react";
import MailList from "../Components/Dashboard.jsx/MailList";
import Sidebar from "../Components/Dashboard.jsx/Sidebar";

export default function Dashboard() {
  return (
    <div className="container" style={{padding:"1rem 0rem"}}>
      <div className="content-wrapper">
        <div className="email-wrapper wrapper">
          <div className="row align-items-stretch">
              <Sidebar propData={localStorage.getItem("user")}/>
          </div>
        </div>
      </div>
    </div>
  );
}
