import { useState } from "react";
import {useCookies} from "react-cookie";
import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/PasswordInput";
import { Link, useNavigate} from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";


const SignupComponent = () => {

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] =useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();


  const signUp = async () =>{
    if(email !== confirmEmail){
      alert("Email and Confirm Email must match");
      return;
    }
    const data = {email, password, username, firstName, lastName}
    const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);
    if(response && !response.err){
      console.log(response);
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate()+ 30)
      setCookie("token", token, {path : "/", expires: date});
      alert("success")
      navigate("/home")
    }else{
      alert("Failure")
    }
  }



  return (
    <div className="vh-100 vw-100 d-flex flex-column align-items-center overflow-auto"   style={{ 
      backgroundImage: `linear-gradient(to bottom, #E4F3E3,#5CA9E9)` 
    }}>
      <div className="p-3 border-bottom border-gray border-width-1 w-100 mb-3 d-flex justify-content-center">
      <div className="fw-bold  fs-1  rounded-pill d-flex justify-content-center font-sans-serif">
            RythymiQ
          </div>
      </div>
      <div className="inputRegion w-25 py-5 ">
        {/*It will take 2 inputs email and password with sign up and sign in buttons*/}
        <div className="fs-1 mb-5">Sign up for listening</div>

        <TextInput
          label="Email ID"
          placeholder="Enter your Email"
          className="mt-2"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label="Confirm you Email"
          placeholder="Enter your Email again"
          className="mt-2"
          value={confirmEmail}
          setValue={setConfirmEmail}
        />
        <TextInput
          label="Username"
          placeholder="Enter your Username"
          className="mt-2"
          value={username}
          setValue={setUsername}
        />
        <PasswordInput label="Create Password"
         placeholder="Enter Password" 
         value={password}
         setValue={setPassword}
         />
        <div className="w-100 d-flex flex-column align-items-center">
        <TextInput
          label="First Name"
          placeholder="Enter your First Name"
          className="mt-2 m-1"
          value={firstName}
          setValue={setFirstName}
          />
        <TextInput
          label="Last Name"
          placeholder="Enter your Last Name"
          className="mt-2 m-1"
          value={lastName}
          setValue={setLastName}
          />
        </div>
        <div className="d-flex justify-content-end p-3 mt-3">
          <button className="btn btn-primary rounded-pill fw-bold" onClick={(e) => {
            e.preventDefault();
            signUp();
          }}>
            SIGN UP
          </button>
        </div>

        <div className="border-bottom border-gray border-width-1 w-100 mb-3 "></div>
        <div className="mt-3 fw-bold d-flex justify-content-center">
          Already have an account?
        </div>
        <div className="border border-gray w-100 d-flex justify-content-center rounded-pill p-3 my-3 bg-primary fw-bold ">
          <Link to="/login" style={{ textDecoration: "none", color : "white"}}>
            LOG IN INSTEAD
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
