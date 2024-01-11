import { ArrowBack } from "@mui/icons-material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CustomConfirmModal from "./CustomConfirmModal";
import axios from "axios";
function getTimeDifferenceInSecondsAndMinutes(createdAt, updatedAt) {
  const createdAtDate = new Date(createdAt);
  const updatedAtDate = new Date(updatedAt);

  // Calculate the time difference in milliseconds
  const timeDifference = updatedAtDate - createdAtDate;

  // Calculate the time difference in seconds and minutes
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  // console.log(minutesDifference);
  return {
    minutes: minutesDifference,
    seconds: secondsDifference % 60,
  };
}
const formatTime = (dateString) => {
  const dateObject = new Date(dateString);
  // Define options for formatting
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // Format the date and time
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  const formattedTime = dateObject.toLocaleTimeString("en-US", timeOptions);

  // Combine date and time
  const formattedDateTime = `${formattedDate} at ${formattedTime}`;

  return formattedDateTime;
};
const SessionHeader = ({ createdAt, updatedAt }) => {
  const location = useLocation();
  const key = location.state.key;
  const sessionId = location.state.sessionId;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleConfirm = async () => {
    setShowModal(false);
    try {
      await axios.delete(
        `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/session/delete/${sessionId}`
      );
      sessionStorage.removeItem("sessions")
      console.log("deleted...");
    } catch (error) {
      console.log("delete session failed error: ", error);
    }
    navigate("/");
  };
  return (
    <>
      <div
        className="background-image"
        style={{
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
        <button
          onClick={() => setShowModal(true)}
          style={{
            position: "absolute",
            top: "24px",
            right: "9.34vw",
            margin: "1rem",
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
          <DeleteForeverIcon sx={{ color: "white", fontSize: "30px" }} />
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
            fontFamily: "'Nunito Sans', sans-serif ",
          }}
        >
          Session {key}
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
            letterSpacing: "0",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "16px",
              fontFamily: "'Nunito Sans', sans-serif ",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
          >
            {formatTime(createdAt)}
          </div>
          <div
            style={{
              color: "white",
              fontSize: "16px",
              fontFamily: "'Nunito Sans', sans-serif ",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
          >
            Duration:{" "}
            {getTimeDifferenceInSecondsAndMinutes(createdAt, updatedAt).minutes
              ? getTimeDifferenceInSecondsAndMinutes(createdAt, updatedAt)
                  .minutes + " minutes"
              : getTimeDifferenceInSecondsAndMinutes(createdAt, updatedAt)
                  .seconds + " seconds"}
          </div>
        </div>
      </div>
      {showModal && (
        <CustomConfirmModal
          message={`Do you want to delete this conversation`}
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default SessionHeader;
