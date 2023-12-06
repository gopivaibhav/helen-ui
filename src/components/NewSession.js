import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../styles/NewSession.css";
import { Link } from "react-router-dom";

const NewSession = () => {
  return (
    <div style={{ marginLeft: "22px" }}>
      <div
        style={{
          color: "black",
          fontSize: 18,
          fontFamily: "Nunito Sans",
          fontWeight: "800",
          lineHeight: "40px",
          wordWrap: "break-word",
        }}
      >
        Begin your healing journey
      </div>

      <Link to="/helen" style={{ textDecoration: "none" }}>
        <div className="FeatureCardWrapper" style={{ margin: "10px 20px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "80% ",
                color: "black",
                fontSize: 18,
                fontFamily: "Nunito Sans",
                fontWeight: "700",
                lineHeight: "40px",
              }}
            >
              Start a therapy session
            </div>
            <div
              style={{
                width: "20%",
                textAlign: "right",
                color: "#FF7777",
                fontSize: 12,
                fontFamily: "Nunito Sans",
                fontWeight: "600",
                lineHeight: "40px",
              }}
            >
              30 mins
            </div>
            <div
              style={{
                width: "70%",
                color: "#4E4D4D",
                fontSize: 12,
                fontFamily: "Nunito Sans",
                fontWeight: "600",
                wordWrap: "break-word",
              }}
            >
              Feeling overwhelmed? A friendly ear is just a click away.
            </div>{" "}
            <div
              style={{
                width: "28%",
                textAlign: "right",
                color: "#FF7777",
                fontSize: 12,
                fontFamily: "Nunito Sans",
                fontWeight: "600",
                lineHeight: "15px",
              }}
            >
              <ArrowForwardIcon />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewSession;
