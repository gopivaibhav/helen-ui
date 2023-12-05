import React from "react";

const UserPofile = () => {
  return (
    <div
      style={{
        background: "#FF7777",
        width: "100%",
        height: "285px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "5px",
          margin: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "0px 10px",
          paddingTop: "75px",
          fontSize: "18px",
          fontWeight: 800,
          fontFamily: "Nunito Sans",
        }}
      >
        Hi John! <span style={{ fontSize: "24px" }}>👋🏻</span>
      </div>

      <div
        style={{
          position: "absolute",
          right: "5px",
          margin: "1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingRight: "10px",
          paddingTop: "85px",
          borderRadius: 7,
          marginRight: "0.5rem",
          width: "60px",
          height: "60px",
        }}
      >
        <img
          style={{ width: "45px", height: "45px", borderRadius: 7 }}
          src="./profile.png"
          alt="user-profile"
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: "5px",
          margin: "1rem",
          top: "150px",
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
