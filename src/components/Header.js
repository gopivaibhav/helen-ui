import React from "react";

const Header = ({ setIsActive }) => {
  const handleClick = () => {
    setIsActive(false);
  };
  return (
    <>
      {/* <button
        onClick={handleClick}
        style={{
          position: "absolute",
          top: "0",
          right: "25px",
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
        {" "}
        <img
          src="https://widget.collegeit.org/icons/close.svg"
          alt="close button"
        />{" "}
      </button> */}
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
