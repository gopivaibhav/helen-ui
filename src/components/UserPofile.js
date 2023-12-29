import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import "../styles/NewSession.css";
import React, { useEffect, useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
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
  console.log("user information >>>>>> ", user, isLoading, isAuthenticated);
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
      style={{
        background: "#FF7777",
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
          fontWeight: 800,
          fontFamily: "Nunito Sans",
        }}
      >
        {isLogin ? patient.nickname + "!" : "Hi !"}{" "}
        {<span style={{ fontSize: "24px" }}>👋🏻</span>}
      </div>
      {isLogin ? (
        <div
          style={{
            position: "absolute",
            right: "6vw",
            margin: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: "10px",
            paddingTop: "57px",
            borderRadius: 7,
            marginRight: "0.5rem",
            width: "60px",
            height: "60px",
          }}
        >
          <img
            style={{ width: "45px", height: "45px", borderRadius: 7 }}
            src={profilePic}
            alt="user-profile"
            onClick={handleProfile}
          />
        </div>
      ) : (
        <div id="login-btn"
          style={{
            position: "absolute",
            right: "6vw",
            margin: "1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: "0px",
            top: "36px",
            borderRadius: 4,
            marginRight: "0.5rem",
            width: "55px",
            height: "35px",
            outline: "none",
            border: "none",
            fontWeight: 500,
            fontSize: "16px",
          }}
          onClick={handleLogin}
        >
          Log In
        </div>
      )}

      {profileDetail && (
        <div
          className="card"
          style={{
            width: "280px",
            height: "150px",
            background: "white",
            boxShadow: "0px 1px 30px rgba(0, 0, 0, 0.2)",
            position: "absolute",
            right: "7vw",
            marginTop: "1.3rem",
            top: "85px",
            display: "flex",
            alignItems: "center",
            paddingRight: "10px",
            paddingTop: "10px",
            borderRadius: 7,
            zIndex: "100",
            fontSize: "13px",
          }}
        >
          <div style={{ width: "35%" }}>
            <img
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                marginLeft: "5px",
              }}
              src={profilePic}
              alt="user-profile"
            />
          </div>
          <div
            style={{
              margin: "10px",
              width: "65%",
            }}
          >
            <div
              style={{
                fontWeight: 800,
                marginBottom: "2px",
              }}
            >
              {patient.nickname}
            </div>
            <div
              style={{
                fontWeight: 500,
                wordWrap: "break-word",
                marginBottom: "2px",
              }}
            >
              {patient.email}
            </div>
            <button
              style={{
                border: "none",
                outline: "none",
                color: "white",
                borderRadius: "4px",
                background: "grey",
                padding: "6px 0px",
                width: "100px",
                fontSize: "16px",
                marginTop: "5px",
                marginBottom: "7px",
                fontWeight: 500,
                textShadow: "0 0 1px #ddd",
                cursor: "pointer",
              }}
              onClick={() => {
                sessionStorage.clear();
                logout({ logoutParams: { returnTo: window.location.origin } });
              }}
            >
              Log Out{" "}
            </button>
          </div>
          <div
            style={{ position: "absolute", right: 0, top: 0, fontSize: "5px" }}
          >
            <EditNoteIcon sx={{ color: "blue", cursor: "pointer" }} />
          </div>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: "0",
          margin: "1rem",
          top: "75px",
          marginBottom: "45px",
          marginTop: "22px",
          marginLeft: "9.3vw",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "40px",
            fontFamily: "Nunito Sans",
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
