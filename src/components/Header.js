import React, { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import CustomConfirmModal from "./CustomConfirmModal";
import ProgressBar from "./ProgressBar";
import axios from "axios";
const Header = ({ setIsActive, progress }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const navigateToHome = () => {
    setShowModal(false);
    window.location.href = "/";
  };

  const handleConfirm = async () => {
    setShowModal(false);
    const data = await axios.get(
      `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/session/get/${sessionStorage.getItem(
        "ongoingSession"
      )}`
    );
    navigateToHome();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleClick = () => {
    setShowModal(true);
  };

  const handleBackButton = () => {
    handleClick();
  };
  const RefreshHandler = () => {
    fetch(`${process.env.REACT_APP_PORT}/reset`, {
      method: "POST",
    }).then((data) => {
      window.location.reload();
    });
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
          fontWeight: "700 !important",
          fontFamily: "'Nunito Sans', sans-serif ",
        }}
        onClick={handleBackButton}
      >
        <img
          style={{
            width: "20px",
            height: "20px",
          }}
          src="/back_button.svg"
          alt="back button"
        />
      </button>
      {showModal && (
        <CustomConfirmModal
          message="Do you really want to exit this session?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {/* <button
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
      </button> */}
      <ProgressBar progress={progress} />
      <div
        style={{
          textAlign: "center",
          color: "black",
          marginTop: "1vh",
          padding: "20px 0",
          fontSize: 50,
          fontWeight: "700 !important",
          wordWrap: "break-word",
        }}
      >
        Helen
      </div>
    </>
  );
};

export default Header;
