import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomConfirmModal from "./CustomConfirmModal";
import ProgressBar from "./ProgressBar";
import axios from "axios";
const Header = ({ setIsActive, progress }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const navigateToHome = () => {
    setShowModal(false);
    navigate("/rating")
  };

  const handleConfirm = async () => {
    setShowModal(false);
    sessionStorage.setItem("progress", progress);
    console.log(progress, typeof progress);
    // const data = await axios.get(
    //   `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/session/get/${sessionStorage.getItem(
    //     "ongoingSession"
    //   )}`
    // );
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
      <Tooltip title="Exit Session" placement="bottom-end">
        <button
          style={{
            position: "absolute",
            top: "0",
            left: "5px",
            margin: "1rem",
            cursor: "pointer",
            outline: "none",
            border: "none",
            // border: "2px solid rgba(117, 139, 255, 1)", // Added border property with a solid red color
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            color: "rgba(117, 139, 255, 1)",
            padding: "0.2rem 10px",
            borderRadius: "10px",
            marginRight: "0.5rem",
            marginLeft: "0.5rem",
            fontSize: "16px",
            fontWeight: "700 !important",
            fontFamily: "'Nunito Sans', sans-serif ",
          }}
          onClick={handleBackButton}
        >
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABEUlEQVR4nO2XPwrCMBSHP/QOvYJeQp11UvAqegAXBz2BTupN2jrp5qSjXcVNilOlkEKI6V+jRe0PMjzykveRvDzyoJI5TYEb4ABjoMmHdQcCZZyAGdAG6q8G6AGeJogr5iN7CKyAi+IX2mugXxTG0wQPh60ARAqDtMQJHJU1yyIAgRIg73wDGAkfvwyAvH5PqgCCv7kCC9iLiibLkZ7c2wAs4CAcdhk2MwpgScEPwi4KsJUqZGaAfUylSxpuzMZJp2EUwDYJYBm8AleTxKkApSehDLHTPLmkxPqtQhSnCiCoroCSv2ReSjnO8yldFAHoAmcNQFTxsnzLN8AAqPEG+TGNyRzomGhM0jQBrmW2ZnylHv7/6ByT+tNxAAAAAElFTkSuQmCC" />
        </button>
      </Tooltip>
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
        <RefreshIcon sx={{ color: "rgba(117, 139, 255, 1)" }} onClick={RefreshHandler} />
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
