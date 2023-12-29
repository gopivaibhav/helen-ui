import { ArrowBack } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
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

  // Format the date
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return formattedDate;
};
const SessionHeader = ({ createdAt, updatedAt, key }) => {
  console.log(key);
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
        Session 1{key}
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
          {formatTime(createdAt)}
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
          Duration:{" "}
          {getTimeDifferenceInSecondsAndMinutes(createdAt, updatedAt).minutes
            ? getTimeDifferenceInSecondsAndMinutes(createdAt, updatedAt)
                .minutes + " minutes"
            : getTimeDifferenceInSecondsAndMinutes(createdAt, updatedAt)
                .seconds + " seconds"}
        </div>
      </div>
    </div>
  );
};

export default SessionHeader;
