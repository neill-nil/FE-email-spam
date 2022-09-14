import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  theme: "colored",
};
export default function SignupPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    contact_no: "",
    email: "",
    password: "",
  });
  useEffect(()=>{
    if(localStorage.getItem("user")){
      navigate("/dashboard")
    }
  },[])
  const changeHandler = (e) => {
    e.preventDefault();
    let value = e.target.value;
    let feild = e.target.name;
    setUserData({ ...userData, [feild]: value });
  };

  const handleValidation = (e) => {
    let nameReg = /^[a-zA-Z ,.'-]+$/g;
    let lastNameReg = /^[a-zA-Z ,.'-]+$/g;
    let passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&()]).{8,}$/g;
    let emailReg = /^\w+([\.-]?\w+)*@genuinemail\.com$/g;
    let mobileReg = /^\d{10}$/g;
    if (
      !nameReg.test(userData.firstname) ||
      userData.firstname.trim().length === 0
    ) {
      toast.error("Use Only Aplhabet in First Name", toastOptions);
      return false;
    }
    if (
      !lastNameReg.test(userData.lastname) ||
      userData.lastname.trim().length === 0
    ) {
      toast.error("Use Only Aplhabet in Last Name", toastOptions);
      return false;
    }
    if (!emailReg.test(userData.email)) {
      toast.error("Enter Correct Email", toastOptions);
      console.log(userData.email);
      return false;
    }
    if (!mobileReg.test(userData.contact_no)) {
      toast.error("Enter correct Mobile Number", toastOptions);
      return false;
    }
    if (!passReg.test(userData.password)) {
      toast.error(
        "Password Must Contains atleast one alphabet, one special character, one number",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const { firstname, lastname, contact_no, email, password } = userData;
    if (handleValidation()) {
      await axios
        .post("/register", {
          firstname,
          lastname,
          contact_no,
          email,
          password,
        })
        .then((req) => {
          console.log(req);
          navigate("/login");
          toast.success(req.data.note,toastOptions)
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.note,toastOptions)
        });
    }
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
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form id="loginForm" onSubmit={signupHandler} method="POST">
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
                    type="text"
                    id="LoginInput"
                    name="firstname"
                    className="form-control form-control"
                    placeholder="Enter a First Name"
                    onChange={changeHandler}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="LoginInput"
                    name="lastname"
                    className="form-control form-control"
                    placeholder="Enter a Last Name"
                    onChange={changeHandler}
                  />
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
                <div className="form-outline mb-4">
                  <input
                    type="phone"
                    id="LoginInput"
                    name="contact_no"
                    className="form-control form-control"
                    placeholder="Enter Phone Number"
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
                    Register
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?{" "}
                    <NavLink to="/login">Login</NavLink>
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
export { toastOptions };
