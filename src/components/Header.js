import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

const Header = () => {
  const RefreshHandler = () => {
    window.location.reload();
  };
  return (
    <>
      <button
        style={{
          position: "absolute",
          top: "0",
          left: "5px",
          margin: "1rem",
          cursor: "pointer",
          outline: "none",
          border: "2px solid #FF7777", // Added border property with a solid red color
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          color: "#FF7777",
          padding: "0.2rem 10px",
          borderRadius: "10px",
          marginRight: "0.5rem",
          fontSize: "16px",
          fontWeight: 700,
          fontFamily: "Nunito Sans",
        }}
      >
        SOS
      </button>

      <button
        style={{
          position: "absolute",
          top: "0",
          right: "5px",
          margin: "1rem",
          cursor: "pointer",
          outline: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          padding: "0.2rem",
          borderRadius: "50%",
          marginRight: "0.5rem",
        }}
      >
        <RefreshIcon sx={{ color: "#FF7777" }} onClick={RefreshHandler} />
      </button>
      <div
        style={{
          textAlign: "center",
          color: "black",
          marginTop: "10vh",
          padding: "20px 0",
          fontSize: 50,
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        Helen
      </div>
    </>
  );
};

export default Header;
