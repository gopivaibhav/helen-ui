import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../styles/NewSession.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NewSession = () => {
  const navigate = useNavigate();

  const startSession = () => {
    console.log("start session");
    fetch(`${process.env.REACT_APP_PORT}/checkaudio/1?q=`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat: [],
      })
    })
    .then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      navigate(`/helen/${data.filename}`);
    })
  }

  return (
    <div style={{ marginLeft: "9.3vw", marginTop: "15px"}}>
      <div
        style={{
          color: "black",
          fontSize: 18,
          fontFamily: "Nunito Sans",
          fontWeight: "800",
          lineHeight: "40px",
          wordWrap: "break-word",
          margin: "20px 1px"
        }}
      >
        Begin your healing journey
      </div>

      {/* <Link to="/helen" style={{ textDecoration: "none" }}> */}
        <div className="FeatureCardWrapper" style={{ margin: "30px 8vw 30px 0px" }} onClick={startSession}>
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
      {/* </Link> */}
    </div>
  );
};

export default NewSession;
