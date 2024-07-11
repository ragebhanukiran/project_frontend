import React from "react";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";

const LoginComponent = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();



  const login = async () => {

        const data = {email, password};
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/login",
            data
        );
        if (response && !response.err) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, {path: "/", expires: date});
            alert("Success");
            navigate("/home");
        } else {
            alert("Failure");
        }
    };



  return (
<div 
  className="vh-100 vw-100 d-flex flex-column align-items-center" 
  style={{ 
    backgroundImage: `linear-gradient(to bottom, #E4F3E3,#5CA9E9)` 
  }}
>      <div className="p-3 border-bottom border-gray border-width-1 w-100 mb-3 d-flex justify-content-center">
      <div className="fw-bold m-3 p-3 fs-1 rounded-pill d-flex justify-content-center font-sans-serif">
            RythymiQ
          </div>      </div>
      <div className="inputRegion w-25 py-5 ">
        {/*2 inputs email and password with sign up and sign in buttons*/}
        <TextInput
          label="Email ID or Username"
          placeholder="Email ID or Username"
          className="mt-2"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput label="Password" 
        placeholder="Password" 
        value={password}
        setValue={setPassword}
        />
        <div className="d-flex justify-content-end p-3 mt-3">
          <button 
          className="btn btn-primary rounded-pill fw-bold"
            onClick={(e) => {
              e.preventDefault();
              login();
          }}
          >
            LOG IN
          </button>
        </div>
        <div className="border-bottom border-gray border-width-1 w-100 mb-3 "></div>
        <div className="mt-3 fw-bold d-flex justify-content-center">
          Don't have an account?
        </div>
        <div className="border border-gray w-100 d-flex justify-content-center rounded-pill p-3 my-3 bg-primary fw-bold ">
          <Link to="/signup" style={{ textDecoration: "none", color : "white"}}>
            SIGN UP FOR RithymiQ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
