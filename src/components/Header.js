import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

const Header = ({ setIsActive }) => {
  // const handleClick = () => {
  //   setIsActive(false);
  // };
  const RefreshHandler = () => {
    window.location.reload();
  };
  return (
    <>
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
        <RefreshIcon onClick={RefreshHandler}/>
      </button>
      <div
        style={{
          textAlign: "center",
          color: "black",
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
