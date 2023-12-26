import { ArrowBack } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SessionHeader = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: "#FF7777",
        width: "100%",
        height: "220px",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "24px",
          margin: "1rem",
          marginLeft: "9.34vw",
          cursor: "pointer",
          outline: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          padding: "0.rem",
          borderRadius: "50%",
          marginRight: "0.5rem",
        }}
      >
        <ArrowBack sx={{ color: "white", fontSize: "30px" }} />
      </button>
      <div
        style={{
          position: "absolute",
          left: "0px",
          marginLeft: "9vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          marginTop: "88px",
          fontSize: "36px",
          fontWeight: 800,
          fontFamily: "Nunito Sans",
        }}
      >
        Session 1
      </div>
      <div
        style={{
          position: "absolute",
          left: "0",
          margin: "1rem",
          top: "75px",
          marginBottom: "45px",
          marginTop: "80px",
          marginLeft: "9.3vw",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "16px",
            fontFamily: "Nunito Sans",
            fontWeight: "600",
            wordWrap: "break-word",
          }}
        >
          Thursday, 12 October 2023
        </div>
        <div
          style={{
            color: "white",
            fontSize: "16px",
            fontFamily: "Nunito Sans",
            fontWeight: "600",
            wordWrap: "break-word",
          }}
        >
          Duration: 23 minutes
        </div>
      </div>
    </div>
  );
};

export default SessionHeader;
