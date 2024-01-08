import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "../styles/NewSession.css";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { ArrowBack } from "@mui/icons-material";
import "../styles/TransitionComponent.css";
const createUser = async (user, setUserId) => {
  try {
    const { name, email, picture } = user;
    const newUser = await axios.post(
      "https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/profile/user",
      { name, email, picture }
    );
    if (newUser.data !== "User already exists") {
      sessionStorage.setItem("userData", JSON.stringify(newUser.data.user));
      setUserId(newUser.data.user._id);
    }
  } catch (error) {
    console.log("fetch user error: ", error);
  }
};

const UserPofile = ({ setUserId }) => {
  const { loginWithRedirect } = useAuth0();
  const [profilePic, setProfilePic] = useState(
    sessionStorage.userData && JSON.parse(sessionStorage.userData)
      ? JSON.parse(sessionStorage.userData).picture
      : ""
  );
  const [profileDetail, setProfileDetail] = useState(false);
  const [isLogin, setIsLogin] = useState(
    sessionStorage.isAuth ? JSON.parse(sessionStorage.isAuth) : false
  );

  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [patient, setPatient] = useState(
    sessionStorage.userDetail && JSON.parse(sessionStorage.userDetail)
      ? JSON.parse(sessionStorage.userDetail)
      : { nickname: "", email: "" }
  );
  useEffect(() => {
    const authData = async () => {
      if (isAuthenticated && !isLoading) {
        setProfilePic(user.picture);
        await createUser(user, setUserId);
        setPatient(user);
        sessionStorage.setItem("userDetail", JSON.stringify(user));
        setIsLogin(true);
      }
      if (!isAuthenticated && !isLoading) {
        // loginWithRedirect();
      }
    };
    authData();
  }, [user, isAuthenticated, isLoading, setProfilePic]);
  const handleProfile = () => {
    setProfileDetail(!profileDetail);
  };
  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div
      className="background-image"
      style={{
        // background: "rgba(117, 139, 255, 1)",
        width: "100%",
        height: "220px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "0px",
          marginLeft: "9.3vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          marginTop: "53px",
          fontSize: "18px",
          fontWeight: 600,
          fontFamily: "'Nunito Sans', sans-serif ",
        }}
      >
        Hi there! {<span style={{ fontSize: "24px" }}> 👋🏻</span>}
      </div>
      <div
        style={{
          position: "absolute",
          right: "6.8vw",
          margin: "1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          top: "50px",
          borderRadius: 7,
          marginRight: "0.1rem",
          width: "0px",
          height: "0px",
        }}
      >
        <MenuIcon
          style={{ width: "30px", height: "30px", color: "white" }}
          onClick={handleProfile}
        />
      </div>
      <nav
        className={`card menu ${profileDetail ? "active" : ""}`}
        style={{
          width: "250px",
          height: "100vh",
          background: "white",
          boxShadow: "0px 1px 30px rgba(0, 0, 0, 0.2)",
          position: "fixed",
          right: profileDetail ? "0%" : "-250px",
          // display: profileDetail ? "block" : "none",
          transition: "0.4s",
          paddingRight: "10px",
          paddingTop: "10px",
          borderRadius: 7,
          zIndex: "100",
          fontSize: "13px",
          letterSpacing: "0",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "15vh",
            alignItems: "center",
          }}
        >
          <ArrowBack
            style={{
              width: "25%",
              color: "rgba(78, 77, 77, 0.8)",
              justifyContent: "left",
            }}
            onClick={handleProfile}
          />
          <div
            style={{
              width: "60%",
              color: "#4E4D4D",
              fontSize: 18,
              fontFamily: "Nunito Sans",
              fontWeight: "600",
              wordWrap: "break-word",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Profile
          </div>
        </div>
        <div>
          {isLogin && (
            <div
              style={{
                wordWrap: "break-word",
                marginBottom: "25px",
                position: "relative",
                left: "25px",
                fontSize: "12px",
                letterSpacing: 0,
              }}
            >
              <div
                style={{
                  marginBottom: "5px",
                }}
              >
                EMAIL
              </div>
              <div
                style={{
                  fontWeight: 700,
                  wordWrap: "break-word",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}
              >
                {patient.email}
              </div>
            </div>
          )}
          {/* <div
              style={{
                width: "85%",
                height: "38px",
                left: "25px",
                position: "relative",
                background: "rgba(255, 119, 119, 0.20)",
                borderRadius: 5,
                border: "1px rgba(117, 139, 255, 1) solid",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Login
            </div> */}
          {isLogin ? (
            <button
              style={{
                outline: "none",
                padding: "6px 0px",
                fontSize: "16px",
                marginTop: "5px",
                marginBottom: "7px",
                fontWeight: 500,
                textShadow: "0 0 1px #ddd",
                cursor: "pointer",
                width: "85%",
                height: "38px",
                left: "25px",
                position: "relative",
                background: "rgba(255, 119, 119, 0.20)",
                borderRadius: 5,
                border: "1px rgba(117, 139, 255, 1) solid",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255, 119, 119, 1)",
              }}
              onClick={() => {
                sessionStorage.clear();
                logout({
                  logoutParams: { returnTo: window.location.origin },
                });
              }}
            >
              LOG OUT{" "}
            </button>
          ) : (
            <button
              style={{
                outline: "none",
                padding: "6px 0px",
                fontSize: "16px",
                marginTop: "5px",
                marginBottom: "7px",
                fontWeight: 500,
                textShadow: "0 0 1px #ddd",
                cursor: "pointer",
                width: "85%",
                height: "38px",
                left: "25px",
                position: "relative",
                background: "rgba(255, 119, 119, 0.20)",
                borderRadius: 5,
                border: "1px rgba(117, 139, 255, 1) solid",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255, 119, 119, 1)",
              }}
              onClick={handleLogin}
            >
              LOG IN{" "}
            </button>
          )}
        </div>
      </nav>
      <div
        style={{
          position: "absolute",
          left: "0",
          margin: "1rem",
          top: "80px",
          marginBottom: "45px",
          marginTop: "22px",
          marginLeft: "9.3vw",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "35px",
            fontFamily: "'Nunito Sans', sans-serif ",
            fontWeight: "800",
            lineHeight: "40px",
            wordWrap: "break-word",
          }}
        >
          How’s your day going today?
        </h1>
      </div>
    </div>
  );
};

export default UserPofile;
