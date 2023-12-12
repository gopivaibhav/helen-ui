import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const createUser = async (user) => {
  try {
    const { name, email, picture } = user;
    const newUser = await axios.post(
      "https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/profile/user",
      { name, email, picture }
    );
  } catch (error) {
    console.log("fetch user error: ", error);
  }
};

const UserPofile = () => {
  const { loginWithRedirect } = useAuth0();
  const [profilePic, setProfilePic] = useState("./profile.png");

  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log("user information >>>>>> ", user, isLoading, isAuthenticated);
  useEffect(() => {
    const authData = async () => {
      if (isAuthenticated && !isLoading) {
        setProfilePic(user.picture);
        await createUser(user);
      }
      if (!isAuthenticated && !isLoading) {
        loginWithRedirect();
      }
    };
    authData();
  }, [user, isAuthenticated, isLoading, loginWithRedirect, setProfilePic]);
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
        {user ? user.name : "Hi John"}!{" "}
        <span style={{ fontSize: "24px" }}>👋🏻</span>
      </div>
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
        />
      </div>
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
