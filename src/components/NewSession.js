import React, { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../styles/NewSession.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { mixPanelTracking } from "../utils/mixPanel";
import { useAuth0 } from "@auth0/auth0-react";
import DisclaimerModal from "./DisclaimerModal";

const NewSession = ({ userId, userData }) => {
  const [sessionId, setSessionId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const handleLogin = () => {
    loginWithRedirect();
    setShowModal(false);
  };
  const sessionHandler = async () => {
    // console.log("user form ", userId);
    if (userId === "") {
      setShowModal(true);
      // loginWithRedirect();
    } else {
      const response = await axios.post(
        `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/session/`,
        {
          userId,
        }
      );
      await setSessionId(response.data._id);
      // if (sessionId) {
      //   navigate("/helen", { state: { sessionId } });
      // }
    }
  };
  const companionHandler = async () => {
    // console.log("user form ", userId);
    if (userId === "") {
      loginWithRedirect();
    } else {
      // if (sessionId) {
      //   navigate("/helen", { state: { sessionId } });
      // }
    }
  };
  useEffect(() => {
    if (sessionId) {
      mixPanelTracking(`newSessionCreated > ${sessionId}`);
      sessionStorage.setItem("ongoingSession", sessionId);
      sessionStorage.setItem("progress", 0);
      navigate("/helen-therapy", { state: { sessionId } });
    }
  }, [sessionId, navigate]);

  // console.log("Userid >>>>> ", userId);
  return (
    <>
      <div style={{ marginLeft: "9.3vw", marginTop: "15px" }}>
        <div
          style={{
            color: "black",
            fontSize: 18,
            fontFamily: "'Nunito Sans', sans-serif ",
            fontWeight: "800",
            lineHeight: "40px",
            wordWrap: "break-word",
            margin: "20px 1px",
          }}
        >
          Begin your healing journey
        </div>
        <div
          className="FeatureCardWrapper"
          style={{ margin: "30px 8vw 30px 0px" }}
          onClick={sessionHandler}
          // onClick={() => {
          //   navigate(`/starting`, { state: { sessionId } });
          // }}
        >
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
                fontFamily: "'Nunito Sans', sans-serif ",
                fontWeight: "700",
                lineHeight: "40px",
              }}
            >
              Start a therapy session
            </div>
            <div class="center-con arrow-div">
              <div class="round">
                <div id="cta">
                  <span class="arrow primera next "></span>
                  <span class="arrow segunda next "></span>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "70%",
                color: "#4E4D4D",
                fontSize: 12,
                fontFamily: "'Nunito Sans', sans-serif ",
                fontWeight: "600",
                wordWrap: "break-word",
                letterSpacing: "0px",
              }}
            >
              Feeling overwhelmed? A friendly ear is just a click away.
            </div>
            <div
              style={{
                width: "20%",
                textAlign: "right",
                color: "rgba(117, 139, 255, 1)",
                fontSize: 12,
                fontFamily: "'Nunito Sans', sans-serif ",
                fontWeight: "600",
                lineHeight: "40px",
              }}
            >
              30 mins
            </div>
            {/* <div
            style={{
              width: "28%",
              textAlign: "right",
              color: "rgba(117, 139, 255, 1)",
              fontSize: 12,
              fontFamily: "'Nunito Sans', sans-serif ",
              fontWeight: "600",
              lineHeight: "15px",
            }}
          >
            <ArrowForwardIcon />
          </div> */}
          </div>
        </div>
        <hr
          style={{ width: "90%", margin: "40px 8vw 40px 10px", opacity: "0.5" }}
        />
        <div
          className="FeatureCardWrapper"
          style={{ margin: "30px 8vw 30px 0px", minHeight: "100px" }}
          // onClick={sessionHandler}
          onClick={() => {
            if (userId === "") {
              loginWithRedirect();
            }
            navigate(`/companion`);
          }}
        >
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
                fontFamily: "'Nunito Sans', sans-serif ",
                fontWeight: "700",
                lineHeight: "40px",
              }}
            >
              {userData && userData.companion
                ? `Talk to  ${userData.companion.companionName}`
                : "Create a friendly companion"}
            </div>
            <div class="center-con arrow-div">
              <div class="round">
                <div id="cta">
                  <span class="arrow primera next "></span>
                  <span class="arrow segunda next "></span>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "70%",
                color: "#4E4D4D",
                fontSize: 12,
                fontFamily: "'Nunito Sans', sans-serif ",
                fontWeight: "600",
                wordWrap: "break-word",
              }}
            >
              A non-judgmental friend who can help set good habits, break
              addictions, and vent.
            </div>
            <div
              style={{
                width: "20%",
                textAlign: "right",
                color: "rgba(117, 139, 255, 1)",
                fontSize: 12,
                fontFamily: "'Nunito Sans', sans-serif ",
                fontWeight: "600",
                lineHeight: "40px",
              }}
            ></div>
            {/* <div
            style={{
              width: "28%",
              textAlign: "right",
              color: "rgba(117, 139, 255, 1)",
              fontSize: 12,
              fontFamily: "'Nunito Sans', sans-serif ",
              fontWeight: "600",
              lineHeight: "15px",
            }}
          >
            <ArrowForwardIcon />
          </div> */}
          </div>
        </div>
      </div>
      {showModal && <DisclaimerModal onConfirm={handleLogin} />}
    </>
  );
};

export default NewSession;
