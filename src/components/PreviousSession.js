import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import "../styles/NewSession.css";
const previousData = [
  { Heading: "Session 4", Date: "Thursday, 12 October 2023" },
  { Heading: "Session 3", Date: "Thursday, 12 October 2023" },
  { Heading: "Session 2", Date: "Thursday, 12 October 2023" },
  { Heading: "Session 1", Date: "Thursday, 12 October 2023" },
];
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
const PreviousSession = ({ sessionDetail }) => {
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
            fontSize: 18,
            fontFamily: "Nunito Sans",
            fontWeight: "800",
            lineHeight: "40px",
            wordWrap: "break-word",
            width: "80%",
            marginBottom: "20px",
            marginLeft: "1px",
          }}
        >
          Revisit your previous sessions
        </div>
        <div
          style={{
            width: "10%",
            color: "#FF7777",
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            marginRight: "8vw",
          }}
        >
          <ImportExportIcon />
        </div>
      </div>
      {sessionDetail &&
        sessionDetail.map((prev, key) => {
          return (
            <div
              className="FeatureCardWrapper"
              style={{ margin: "15px 8vw 25px 0px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "85%",
                  }}
                >
                  <div
                    style={{
                      width: "100% ",
                      color: "black",
                      fontSize: 18,
                      fontFamily: "Nunito Sans",
                      fontWeight: "700",
                      lineHeight: "40px",
                    }}
                  >
                    Session {key + 1}
                  </div>
                  <div
                    style={{
                      width: "85%",
                      color: "#4E4D4D",
                      fontSize: 12,
                      fontFamily: "Nunito Sans",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    {formatTime(prev.createdat)}
                  </div>{" "}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    color: "#FF7777",
                    fontSize: 12,
                    fontFamily: "Nunito Sans",
                    fontWeight: "600",
                    lineHeight: "15px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ArrowForwardIcon />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PreviousSession;
