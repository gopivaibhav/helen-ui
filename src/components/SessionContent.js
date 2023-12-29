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
const SessionContent = ({ homework_summary, session_overview }) => {
  console.log(homework_summary);
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
          {session_overview}
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
          {homework_summary}
          {/* <ol style={{ marginLeft: "16px" }}>
            <li style={{ marginBottom: "16px" }}>{homework_summary}</li>
          </ol> */}
        </div>
      </div>
    </div>
  );
};

export default SessionContent;
