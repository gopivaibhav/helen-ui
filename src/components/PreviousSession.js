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
const PreviousSession = () => {
  return (
    <div style={{ marginLeft: "22px" }}>
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
            marginRight: "20px",
          }}
        >
          <ImportExportIcon />
        </div>
      </div>
      {previousData.map((prev) => {
        return (
          <div className="FeatureCardWrapper" style={{ margin: "14px 20px" }}>
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
                  {prev.Heading}
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
                  {prev.Date}
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
