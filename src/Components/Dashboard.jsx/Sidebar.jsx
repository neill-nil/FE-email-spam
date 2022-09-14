import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComposeModal from "../Compose/ComposeModel";
import MailList from "./MailList";

export default function Sidebar({ propData }) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const menuItems = {
    Primary: <></>,
    Sent: <></>,
    Spam: <></>,
    Starred: <></>,
    Trash: <></>,
  };
  const [active,setActive] = useState("primary")
  const clickHandler = async (e) => {
    let value = e.target.getAttribute("name");
    value = value.toLowerCase();
    let userId = JSON.parse(propData).user_id;
    setActive(value)
    await axios
      .get(`/inbox/${value}/${userId}`)
      .then((req) => {
        console.log(req.data);
        localStorage.setItem("value",value);
        localStorage.setItem("userId",userId);
        setData(req.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const logoutHandler = async (e) => {
    e.preventDefault();
    await axios.get("/logout").then(() => {
      localStorage.clear()
      navigate("/login");
    });
  };
  const fetch = async () => {
    let userId = JSON.parse(propData).user_id;
    await axios
      .get(`/inbox/primary/${userId}`)
      .then((req) => {
        console.log(req.data);
        setData(req.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <div
        className="mail-sidebar d-none d-lg-block col-md-2 pt-3 bg-white"
        style={{ height: "95vh" }}
      >
        <div className="menu-bar">
          <ul className="menu-items">
            <li className="compose mb-3" style={{display:"flex",justifyContent:"center"}}>
              <ComposeModal/>
            </li>
            {Object.keys(menuItems).map((value) => {
              return (
                <li className={(value.toLocaleLowerCase()===active)?"active":""} onClick={clickHandler} name={value}>
                  <a href="#" name={value} style={{ pointerEvents: "none" }}>
                    <i className="mdi mdi-email-outline" name={value}></i>{" "}
                    {value}
                  </a>
                  <span className="badge badge-pill badge-success" name={value}>
                    8
                  </span>
                </li>
              );
            })}
          </ul>
          <button className="btn btn-primary btn-block" id="logoutBtn" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
      {data && <MailList data={data} setData={setData} />}
    </>
  );
}
