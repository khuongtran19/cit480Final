import React, { useState } from "react";
import "./Login.css";
import logoPic from "./../../images/logo-2-light.png";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import swal from "sweetalert";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import GOOGLE_KEY from "./../../../.env"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userLoginId, setUserLoginId] = useState();

  const responseGoogle = async (response) => {
    console.log(response);
    if (response) {
      navigate("/Home");
    } else {
      swal("You are not registered");
    }
  };
  // API///////
  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        const response = await axios.post("http://localhost:4000/api/login", {
          email,
          password,
        });
        console.log("reposnse datfe", response);
        setUserLoginId(response?.data?.data?._id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userID", response?.data?.data?._id);
        swal("Succesfully Login!");
        navigate("/Recipe", { replace: true });
      } else {
        swal("Please provide your required field!");
      }
    } catch (error) {
      console.log(error);
      swal("You are not a valid user");
    }
  };

  // //////

  // API END
  return (
    <>
      <div className="mainContainerLoginPage">
        <div className="leftLoginPage">
          <div className="innerLeft">
            <p className="txtLogLeft">
              <span className="spTxtLogLeft">Welcome</span>, We are glad to see
              you again!
            </p>
          </div>
        </div>

        <div className="rightLoginPage">
          <div className="rightLogInner">
            <div className="row1LogRight">
              <p className="notNumTxt">Not a member?</p>
              <Link to="/Register">
                <p className="regisTxt">Register</p>
              </Link>
            </div>
            <p className="loginYourAccTxt">Log In to Your Account</p>
            <div>
              <GoogleLogin
                className="btnGoogle"
                clientId={GOOGLE_KEY}
                buttonText="Continue with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              >
                Login with Google
              </GoogleLogin>

              {/* <AiFillApple className="logoApple" /> */}
            </div>
            <div className="mainTopOr">
              <div className="lineBeforeR"></div>
              <p className="orTxt">OR</p>
              <div className="lineAfterR"></div>
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
              <Link to="/ForgotPassword">
                <p className="txtForGotPass">Forgot Password ?</p>
              </Link>
            </div>
            <input
              type="password"
              className="passwordInput"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <Link to="/Recipe"> */}
            <button className="btnLogin" onClick={HandleLogin}>
              Login
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
