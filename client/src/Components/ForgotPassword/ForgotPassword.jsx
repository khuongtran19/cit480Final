import React from "react";
import { useState } from "react";
import "./ForgotPassword.css";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [Otp, setOtp] = useState();
  const [switchButton, setSwitchButton] = useState(1);
  const [createPassword, setcreatePassword] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const HandleSubmit = () => {
    setLoader(true);
    axios({
      method: "POST",
      url: "http://localhost:4000/api/forget_password",
      data: { email },
    }).then((response) => {
      setLoader(false);
      console.log("response: ", response.data);
      setSwitchButton(2);
    });
  };
  //   if (email === "") {
  //     swal("Provide the requied field!");
  //   } else if (Otp === "") {
  //     swal("Provide the requied field!");
  //   } else {
  //     navigate("/Home");
  //   }
  // }
  const HandleSubmit2 = () => {
    axios
      .post("http://localhost:4000/api/reset_password", {
        email,
        otp: Otp,
        password,
      })
      .then((response) => {
        swal("Password updated successfully");
        navigate("/Home");
      })
      .catch((err) => {
        console.log("nahi chali");
      });
  };

  const conditionalFields = () => {
    if (switchButton === 1) {
      return (
        <div className="topEmailInput">
          <p className="emailTxt">Email or Mobile Number</p>
          <input
            type="text"
            placeholder="Enter Email or Mobile Number"
            className="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      );
    } else if (switchButton === 2) {
      return (
        <div className="topEmailInput">
          <p className="emailTxt">Enter Your OTP</p>
          <input
            type="number"
            autocomplete="off"
            name="hidden"
            placeholder="Enter Your OTP"
            className="emailInput"
            value={Otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            style={{ marginTop: "10px" }}
            type="password"
            placeholder="Enter a new Password"
            className="emailInput"
            autocomplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      );
    } else if (switchButton === 3) {
      return (
        <div className="topEmailInput">
          <p className="emailTxt">Create New Password</p>
          <input
            // type="password"
            placeholder="Create a New"
            className="emailInput"
            autocomplete="off"
            value={createPassword}
            onChange={(e) => setcreatePassword(e.target.value)}
          />
        </div>
      );
    }
  };

  const handleButton = () => {
    if (switchButton === 1) {
      return (
        <>
          {loader ? (
            <div>loading...</div>
          ) : (
            <button className="btnLogin" onClick={HandleSubmit}>
              Put Your Email
            </button>
          )}
        </>
      );
    } else if (switchButton === 2) {
      return (
        <button
          className="btnLogin"
          onClick={() => {
            // setSwitchButton(3);
            HandleSubmit2();
          }}
        >
          Submit
        </button>
      );
    } else if (switchButton === 3) {
      return (
        <button
          className="btnLogin"
          onClick={() => {
            setSwitchButton(4);
            // handleSubmit3();
          }}
        >
          Create New Password
        </button>
      );
    }
  };

  const responseGoogle = async (response) => {
    console.log(response);
    if (response) {
      navigate("/Home");
    } else {
      swal("You are not registered");
    }
  };
  ///////////////////////////////////////////
  
  return (
    <>
      <div className="mainContainerLoginPage">
        <div className="leftLoginPage">
          <div className="innerLeft">
            <p className="txtLogLeft">
              <span className="spTxtLogLeft">Don't worry</span>, We are here
              help you to recover your password.
            </p>
          </div>
        </div>

        <div className="rightLoginPage">
          <div className="rightLogInner">
            <div className="row1LogRight">
              <p className="notNumTxt">Return to</p>
              <Link to="/">
                <p className="regisTxt">Login</p>
              </Link>
            </div>
            <p className="loginYourAccTxt" id="forgotPassword">
              Forgot password?
            </p>

            <p className="forEmMobTxt">
              Enter the email address or mobile number associated with your
              account.
            </p>

            {/* //////////////////////////////////////////////////////////// */}

            {conditionalFields()}
            {handleButton()}
            {/* {allApis()} */}
            <div className="mainTopOr">
              <div className="lineBeforeR"></div>
              <p className="orTxt">OR</p>
              <div className="lineAfterR"></div>
            </div>
            <div>
              <GoogleLogin
                className="btnGoogle"
                clientId="677360402906-k4mm9bpq4tduegadicuefbirqpb2ebj8.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              >
                Login with Google
              </GoogleLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
