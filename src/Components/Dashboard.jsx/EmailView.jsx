import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../Pages/SignupPage";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useState } from "react";
export default function EmailView({
  curData,
  setCurData,
  hideOpenMail,
  setHideOpenMail,
}) {
  console.log(curData);
  const starHandler = async (e) => {
    e.preventDefault();
    let email_id = curData.email_id;
    await axios
      .put("/update", {
        action: "star",
        email_id,
      })
      .then((req) => {
        console.log(req);
        toast.success(req.data.note, toastOptions);
        (!curData.starred)? 
        setCurData({
          ...curData,
          starred: true,
        })
        :setCurData({
          ...curData,
          starred: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    let email_id = curData.email_id;
    await axios
      .put("/update", {
        action: "delete",
        email_id,
      })
      .then((req) => {
        console.log(req);
        setHideOpenMail(true);
        toast.success(req.data.note, toastOptions);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mail-view d-none d-md-block col-md-9 col-lg-7 bg-white">
      <div className="row">
        <div className="col-md-12 mb-4 mt-4">
          <div className="btn-toolbar">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleClick}
              >
                <i className="mdi mdi-delete text-primary mr-1"></i>
                Delete
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={starHandler}
              >
                {curData.starred ? <AiFillStar /> : <AiOutlineStar />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="message-body">
        <div className="sender-details">
          <img
            className="img-sm rounded-circle mr-3"
            style={{ height: "70px" }}
            src="https://p.kindpng.com/picc/s/24-248325_profile-picture-circle-png-transparent-png.png"
            alt=""
          />
          <div className="details">
            <p className="msg-subject">{curData.subject}</p>
            <p className="sender-email">
              {curData.firstname + " " + curData.lastname}
              <a href="#">{curData.email}</a>
              &nbsp;<i className="mdi mdi-account-multiple-plus"></i>
            </p>
          </div>
        </div>
        <div className="message-content">{curData.email_body}</div>
      </div>
    </div>
  );
}
