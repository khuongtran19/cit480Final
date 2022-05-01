import React from "react";
import "./Register.css";
import logoPic from "./../../images/logo-2-light.png";
import { AiFillApple } from "react-icons/ai";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GOOGLE_KEY from "./../../../.env";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  // const [checkbox, setChecker] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    console.log(response);
  };
  const HandleCreate = async (e) => {
    e.preventDefault();
    try {
      if (!userName) {
        swal("Fill in username");
      } else if (!email) {
        swal("Fill in email");
      } else if (!password) {
        swal("Fill in password");
      } else if (!isChecked) {
        swal("Fill in checker");
      } else {
        navigate("../Login", { replace: true });
        const response = await axios.post("http://localhost:4000/api/create", {
          userName,
          email,
          password,
          isChecked,
        });
      }

      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mainContainerLoginPage">
        <div className="leftLoginPage">
          <div className="innerLeft">

            <p className="txtLogLeft">
              <span className="spTxtLogLeft">Welcome</span>, Looks like you're
              new here!
            </p>
          </div>
        </div>

        <div className="rightLoginPage">
          <div className="rightLogInner">
            <div className="row1LogRight">
              <p className="notNumTxt">Already a member?</p>
              <Link to="/">
                <p className="regisTxt">Login</p>
              </Link>
            </div>
            <p className="loginYourAccTxt">Register Your Account</p>
            <div>
              <GoogleLogin
                className="btnGoogle"
                clientId={GOOGLE_KEY}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              >
                Register with Google
              </GoogleLogin>

            </div>
            <div className="mainTopOr">
              <div className="lineBeforeR"></div>
              <p className="orTxt">OR</p>
              <div className="lineAfterR"></div>
            </div>
            <div className="topEmailInput">
              <p className="emailTxt">Full Name</p>
              <input
                type="email"
                placeholder="Enter Your Name"
                className="emailInput"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="topEmailInput">
              <p className="emailTxt">Email Address</p>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mainPasForPas">
              <p className="passTxt">Password</p>
            </div>
            <input
              type="password"
              className="passwordInput"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="topDivAgree">
              <input
                className="checkBoxReg"
                value={isChecked}
                onChange={(e) => setIsChecked(e.target.value)}
                type="checkbox"
                id="checkbox"
                checked={isChecked}
              />
              <p className="termPriTxt">
                I agree to the <span className="temrPriTxtSp">Terms </span>and
                <span className="temrPriTxtSp">Privacy Policy</span>.
              </p>
            </div>
            <button className="btnLogin" onClick={HandleCreate}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
