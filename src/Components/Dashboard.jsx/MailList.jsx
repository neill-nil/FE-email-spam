import axios from "axios";
import React, { useEffect, useState } from "react";
import EmailView from "./EmailView";

export default function MailList({ data, setData }) {
  const [curData, setCurData] = useState({});
  const [hideOpenMail, setHideOpenMail] = useState(true);
  let action = "read";
  const handleRead = async (email_id) => {
    await axios
      .put("/update", {
        email_id,
        action,
      })
      .then((req) => {
        console.log(req);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = async (e) => {
    let value = localStorage.getItem("value");
    let userId = localStorage.getItem("userId");
    await axios
      .get(`/inbox/${value}/${userId}`)
      .then((req) => {
        setData(req.data);
        console.log(req);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        className="mail-list-container col-md-3 pt-4 pb-4 border-right bg-white"
        style={{ height: "95vh", overflowY: "auto" }}
      >
        {data.map((value) => {
          return (
            <div
              className={value.read ? "mail-list" : "mail-list new_mail"}
              onClick={() => {
                handleRead(value.email_id);
                handleUpdate();
                setCurData(value);
              }}
            >
              <div className="content">
                <p className="sender-name">{value.email}</p>
                <p className="sender-name">{value.subject}</p>
                <p className="message_text">{value.email_body}</p>
              </div>
              <div className="details">
                <i className="mdi mdi-star-outline"></i>
              </div>
            </div>
          );
        })}
      </div>
      {Object.keys(curData).length === 0 ? (
        <div
          className="mail-view col-md-9 col-lg-7 bg-white"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <h1>No Emails</h1>
        </div>
      ) : (
        curData && (
          <EmailView
            subject={curData.subject}
            curData={curData}
            hideOpenMail={hideOpenMail}
            setHideOpenMail={setHideOpenMail}
            setCurData={setCurData}
          />
        )
      )}
    </>
  );
}
