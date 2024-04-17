"use client";
import { useEffect, useState, useRef } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import axios from "axios";

import "../styles/Menu.css";
import "../styles/Mic.css";
import RippleEffect from "../components/RippleEffect";
import Fade from "@mui/material/Fade";
import { withStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
// import { useNavigate } from "react-router-dom";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from '@mui/icons-material/CallEnd';
// import { useWebSocket } from "../WebSocketProvider";

const agentId = process.env.REACT_APP_RETELL_AGENT;

const webClient = new RetellWebClient();
const CallInterface = () => {
  // const socket = useWebSocket();
  const [isCalling, setIsCalling] = useState(false);
  const [caption, setCaption] = useState("");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  // const [isAI, setisAI] = useState(true)

  // Initialize the SDK
  useEffect(() => {
    // Setup event listeners
    webClient.on("conversationStarted", () => {
      console.log("conversationStarted");
    });

    webClient.on("audio", (audio) => {
      console.log("There is audio");
    });

    webClient.on("conversationEnded", ({ code, reason }) => {
      console.log("Closed with code:", code, ", reason:", reason);
      setIsCalling(false); // Update button to "Start" when conversation ends
    });

    webClient.on("error", (error) => {
      console.error("An error occurred:", error);
      setIsCalling(false); // Update button to "Start" in case of error
    });

    webClient.on("update", (update) => {
      // Print live transcript as needed
      console.log("update", update);
      let totalCaption = "\n";
      update.transcript.forEach((element) => {
        totalCaption += element.role + "- ";
        totalCaption += element.content + " \n";
      });
      setCaption(() => totalCaption);
      // REST API to the server
    });
  }, []);
  const toggleConversation = async () => {
    console.log(isCalling);
    if (isCalling) {
      webClient.stopConversation();
    } else {
      const registerCallResponse = await registerCall(agentId);
      if (registerCallResponse.data.call_id) {
        webClient
          .startConversation({
            callId: registerCallResponse.data.call_id,
            sampleRate: registerCallResponse.data.sample_rate,
            enableUpdate: true,
          })
          .catch(console.error);
        setIsCalling(true); // Update button to "Stop" when conversation starts
      }
    }
  };
  useEffect(() => {
    console.log(caption);
  }, [caption]);
  async function registerCall(agentId) {
    try {
      // Replace with your server url
      const response = await axios.post(
        `${process.env.REACT_APP_PORT}/register-call-on-your-server`,
        {
          agent_id: agentId,
          email: JSON.parse(sessionStorage.getItem("userDetail")).email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // if (!response.ok) {
      //   throw new Error(Error: ${response.status});
      // }
      console.log("response", response);
      // const data: RegisterCallResponse = await response
      return response;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
  const [mute, setMute] = useState("Unmute");
  const handleButtonClick = () => {
    toggleConversation();
    if (mute === "Unmute") {
      setMute("Mute");
      setTooltipOpen(true);
      setTimeout(() => {
        setTooltipOpen(false);
      }, 1500);
      // setImgsrc("/icons/MicroPhone.svg");
    } else {
      setMute("Unmute");
      // setImgsrc("/icons/MicroPhoneMuted.svg");
    }
  };

  const CustomToolTip = withStyles({
    tooltip: {
      width: "1000px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1rem",
      textAlign: "center",
      color: "F2F1EB",
      backgroundColor: "#707070",
    },
  })(Tooltip);
  console.log(mute)
  return (
    <>
      <RippleEffect isPlaying={false} />
      {/* {!showRatingModal && <RippleEffect isPlaying={isPlaying} />} */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        {/* {isPressed && (
          <span className="fade-in-text" style={{ fontSize: "24px" }}>
            Listening...
          </span>
        )} */}
      </div>
      <div
        style={{
          width: "100%",
          height: "25vh",
          textAlign: "center",
          color: "black",
          fontSize: 18,
          fontFamily: "'Nunito Sans', sans-serif ",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        {caption !== "" && (
          <div id="caption-container">
            <span id="captiontext">{caption}</span>
          </div>
        )}
      </div>
      <div
        style={{
          width: "100%",
          height: "100px",
          background: "rgba(117, 139, 255, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          bottom: 0,
          left: 0,
          padding: 0,
          margin: 0,
        }}
      >
        <CustomToolTip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 0 }}
          open={tooltipOpen}
          sx={{ width: "1000 rem", color: "green" }}
          placement="top"
          title="Click to End the Call"
        >
          <button
            id="micButton"
            onClick={handleButtonClick}
            style={{
              width: "100px",
              height: "100px",
              background: "white",
              borderRadius: "50%",
              borderColor: "white",
              textAlign: "center",
              color: "rgba(117, 139, 255, 1)",
              fontSize: 40,
              border: "none",
              fontFamily: "'Nunito Sans', sans-serif ",
              fontWeight: "700",
              wordWrap: "break-word",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: "-48px",
            }}
          >
            <div
              style={{
                width: "92px",
                height: "92px",
                background: "rgba(117, 139, 255, 1)",
                borderRadius: "50%",
                textAlign: "center",
                color: "white",
                borderColor: "white",
                fontSize: 12,
                fontFamily: "'Nunito Sans', sans-serif ",
                fontWeight: "700",
                wordWrap: "break-word",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {mute === "Unmute" ? (
                <MicOffIcon
                  id="MicImage"
                  sx={{ width: "45px", height: "45px" }}
                />
              ) : (
                <CallEndIcon id="EndCall" sx={{ width: "45px", height: "45px" }} />
              )}
            </div>
          </button>
        </CustomToolTip>
        <button
          onClick={() => {
            webClient.stopConversation();
            // history.push("/usc");
          }}
        >
          Leave Call
        </button>
      </div>
    </>
  );

  // OLD CODE FOR CALL INTERFACE
  // return (
  //   <div>
  //     {/* <Footer mute={mute} setMute={setMute} toggleConversation={toggleConversation} webClient={webClient} /> */}
  //     <div style={{ display: "flex" }}>
  //       <button onClick={handleButtonClick}>
  //         <span style={{ width: "62px", color: "black" }}>{mute}</span>
  //       </button>
  //       <button
  //         onClick={() => {
  //           webClient.stopConversation();
  //           // history.push("/usc");
  //         }}
  //       >
  //         Leave
  //       </button>
  //     </div>
  //     <div>{caption}</div>
  //   </div>
  // );
};

export default CallInterface;
