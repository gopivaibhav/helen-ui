import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import "../styles/NewSession.css";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
            fontFamily: "'Nunito Sans', sans-serif ",
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
            color: "rgba(117, 139, 255, 1)",
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            marginRight: "8vw",
            height: "45px",
          }}
        >
          <ImportExportIcon />
        </div>
      </div>
      {sessionDetail &&
        sessionDetail
          .slice()
          .reverse()
          .map((prev, key) => {
            return (
              <div
                className="FeatureCardWrapper"
                style={{ margin: "15px 8vw 25px 0px" }}
                key={key}
                onClick={() => {
                  console.log(prev._id);
                  navigate("/session", {
                    state: {
                      sessionId: prev._id,
                      key: sessionDetail.length - key,
                    },
                  });
                }}
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
                        fontFamily: "'Nunito Sans', sans-serif ",
                        fontWeight: "700",
                        lineHeight: "40px",
                        // letterSpacing: "0"
                      }}
                    >
                      Session {sessionDetail.length - key}
                    </div>
                    <div
                      style={{
                        width: "85%",
                        color: "#4E4D4D",
                        fontSize: 12,
                        fontFamily: "'Nunito Sans', sans-serif ",
                        fontWeight: "600",
                        wordWrap: "break-word",
                        letterSpacing: "0",
                      }}
                    >
                      {formatTime(prev.createdat)}
                    </div>{" "}
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      color: "rgba(117, 139, 255, 1)",
                      fontSize: 12,
                      fontFamily: "'Nunito Sans', sans-serif ",
                      fontWeight: "600",
                      lineHeight: "15px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ArrowForwardIcon
                      sx={{ color: "rgba(117, 139, 255, 1) !important" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default PreviousSession;
