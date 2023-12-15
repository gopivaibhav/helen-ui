import React from "react";
import "../styles/NewSession.css";
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
const SessionContent = ({ sessionDetail }) => {
  console.log("previous session >>>>> ", sessionDetail);
  return (
    <div style={{ marginLeft: "9.3vw" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            color: "black",
            fontSize: 16,
            fontFamily: "Nunito Sans",
            fontWeight: "700",
            lineHeight: "40px",
            wordWrap: "break-word",
            width: "80%",
            marginTop: "10px",
            marginBottom: "20px",
            marginLeft: "1px",
          }}
        >
          Summary
        </div>
        <div
          style={{
            color: "#4E4D4D",
            fontSize: 16,
            fontFamily: "Nunito Sans",
            fontWeight: "400",
            wordWrap: "break-word",
            width: "80%",
            marginBottom: "20px",
            marginLeft: "1px",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
        <div
          style={{
            color: "black",
            fontSize: 16,
            fontFamily: "Nunito Sans",
            fontWeight: "700",
            lineHeight: "40px",
            wordWrap: "break-word",
            width: "80%",
            marginTop: "10px",
            marginBottom: "20px",
            marginLeft: "1px",
          }}
        >
          Homework
        </div>
        <div
          style={{
            color: "#4E4D4D",
            fontSize: 16,
            fontFamily: "Nunito Sans",
            fontWeight: "400",
            wordWrap: "break-word",
            width: "80%",
            marginBottom: "20px",
            marginLeft: "1px",
          }}
        >
          <ol style={{ marginLeft: "16px" }}>
            <li style={{ marginBottom: "16px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </li>
            <li style={{ marginBottom: "16px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SessionContent;
