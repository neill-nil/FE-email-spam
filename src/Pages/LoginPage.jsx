import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "./SignupPage";

export default function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  }, []);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    e.preventDefault();
    let value = e.target.value;
    let feild = e.target.name;
    setUserData({ ...userData, [feild]: value });
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    await axios
      .post("/login", {
        email,
        password,
      })
      .then((req) => {
        console.log(req);
        localStorage.setItem("user", JSON.stringify(req.data));
        toast.success("Successfully Login", toastOptions);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.note, toastOptions);
      });
  };
  return (
    <div
      style={{
        height: "100vh",
        background: "#3e9bff8c",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <section
        style={{
          height: "90vh",
          width: "90vw",
          display: "flex",
          borderRadius: "7px",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
          boxShadow: "0 0 10px 1px #ac9f9f5e",
        }}
      >
        <div
          className="container-fluid h-custom"
          style={{ background: "white" }}
        >
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="/logo.png"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form id="loginForm" onSubmit={loginHandler} method="POST">
                <div>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "bolder",
                      color: "#007bff",
                    }}
                  >
                    Welcome
                  </p>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="LoginInput"
                    name="email"
                    className="form-control form-control"
                    placeholder="Enter a valid email address"
                    onChange={changeHandler}
                  />
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="LoginInput"
                    name="password"
                    className="form-control form-control"
                    placeholder="Enter password"
                    onChange={changeHandler}
                  />
                </div>
                <div className="text-center text-lg-start mt-1 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn pr-3 pl-3"
                    id="loginButton"
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <NavLink to="/signup">Register</NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer autoClose={1000} />
    </div>
  );
}
