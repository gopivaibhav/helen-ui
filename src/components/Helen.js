import React from "react";
import "../styles/Menu.css";
import "../styles/Mic.css";
import RippleEffect from "./RippleEffect";
import Fade from "@mui/material/Fade";
import { withStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MicIcon from "@mui/icons-material/Mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useWebSocket } from "../WebSocketProvider";
import { useLocation } from "react-router-dom";
import axios from "axios";

const addMessage = async (sender, content, session) => {
  const res = await axios.post(
    `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/session/${session}/messages`,
    {
      sender,
      content,
    }
  );
};
const Helen = ({ topic = "", setProgress, showRatingModal }) => {
  const socket = useWebSocket();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [loader, setLoader] = useState(false);
  const [listeningLoader, setListeningLoader] = useState(false);
  const [chat, setChat] = useState([]);
  const [changeButtonFunction, setChangeButtonFunction] = useState(true);
  const [isHolding, setIsHolding] = useState(false);
  const [textArray, setTextArray] = useState([]);
  const [caption, setCaption] = useState("");
  const [updatedState, setUpdatedState] = useState('');
  const navigate = useNavigate();

  const [finalBlobs, setFinalBlobs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const currentBlobIndex = useRef(0);
  const [toolTipOpen, setToolTipOpen] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    // Attach the event listener when the component mounts
    document.addEventListener("contextmenu", handleContextMenu);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const location = useLocation();
  const state = location.state.sessionId;
  let holdTimeout;
  const handleMouseDown = () => {
    setIsHolding(true);
    setChangeButtonFunction(false);
    setListeningLoader(true);
    setToolTipOpen(false);
    SpeechRecognition.startListening({
      language: "en-UK",
      continuous: true,
    });
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      SpeechRecognition.abortListening({
        language: "en-UK",
      });
    }, 1000);

    setChangeButtonFunction(true);
    setIsHolding(false);
  };

  useEffect(() => {
    console.log("listening changed to-", listening);
    if (!listening) {
      setListeningLoader(false);
      handleRequest();
    }
  }, [listening]);

  const playNextBlob = () => {
    // console.log('in play next blob', currentBlobIndex.current, finalBlobs.length)
    if (currentBlobIndex.current < finalBlobs.length) {
      // console.log('successs')
      setIsPlaying(true);
      setIsButtonDisabled(true);
      const blob = finalBlobs[currentBlobIndex.current];
      const blobUrl = URL.createObjectURL(blob);

      audioRef.current.src = blobUrl;
      // audioRef.current.muted = false;
      audioRef.current
      .play()
      .then(() => {
        setCaption(textArray[currentBlobIndex.current - 1]);
      })
      .catch((err) => {
        console.log(err, "ERROR in playing audio");
      });
    
      
      currentBlobIndex.current += 1;
    }
  };

  const checkPlaying = () => {
    if (currentBlobIndex.current < textArray.length) {
      if (textArray[currentBlobIndex.current] === " ALL DONE ") {
        console.log("\nFinal Caption-", textArray.join(" ").slice(0, -11));
        if (chat.length == 0) {
          setToolTipOpen(true);
        }
        setChat((prev) => [
          ...prev,
          { role: "assistant", content: textArray.join(" ").slice(0, -11) },
        ]);
        addMessage("assistant", textArray.join(" ").slice(0, -11), state);
        setTextArray(() => []);
        currentBlobIndex.current = 0;
        setFinalBlobs([]);
        if (updatedState === "Conclusion") {
          setTimeout(() => {
            navigate("/rating");
          }, 2000);
        }
      }
    }
  };

  const handleAudioEnded = () => {
    setCaption("");
    setIsPlaying(() => false);
    setIsButtonDisabled(false);
    checkPlaying();
  };

  useEffect(() => {
    // console.log('in use effect', finalBlobs, isPlaying)
    if (finalBlobs.length > 0 && !isPlaying) {
      playNextBlob();
    }
  }, [finalBlobs, isPlaying]);

  useEffect(() => {
    const handleClose = () => {
      console.log("WebSocket connection ended");
    };

    if (socket) {
      const sendMsg = () => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              need: "openai",
              query: "",
              chat: chat,
              email: JSON.parse(sessionStorage.getItem("userDetail")).email,
            })
          );
        } 
        else {
          console.log('socket not open')
          setTimeout(sendMsg, 1);
        }
      };
      sendMsg();
      SpeechRecognition.startListening({
        language: "en-UK",
        continuous: true,
      });
      setTimeout(() => {
        SpeechRecognition.abortListening({
          language: "en-UK",
        });
      }, 0);
      socket.addEventListener("message", (event) => {
        const message = event.data;
        if (typeof message === "string") {
          const res = JSON.parse(message);
          if (res.AI) {
            // console.log(res.AI);
            setTextArray((prev) => [...prev, res.AI]);
          } else {
            console.log("state", res);
            if (res.done) {
              setTextArray((prev) => [...prev, " ALL DONE "]);
            }
            if (res.percentage) setProgress(res.percentage);
            if(res.updated_state) setUpdatedState(res.updated_state);
          }
        } else {
          // console.log('blob', message, typeof(message))
          setFinalBlobs((prev) => [...prev, message]);
        }
      });
      socket.addEventListener("close", handleClose);
    }

    // const intervalId = setInterval(() => {
    //   if (socket.readyState === WebSocket.OPEN) {
    //     socket.send(
    //       JSON.stringify({ need: "nothing" })
    //     );
    //   }
    // }, 5000);

    return () => {
      if (socket) {
        // clearInterval(intervalId);
        socket.removeEventListener("close", handleClose);
      }
    };
  }, [socket]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

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

  const handleRequest = () => {
    console.log("API Request-", transcript);
    if (transcript && transcript.length >= 2) {
      resetTranscript();
      // sendAPIRequest(transcript);
      socket.send(
        JSON.stringify({
          need: "openai",
          query: transcript,
          chat: chat,
          email: JSON.parse(sessionStorage.getItem("userDetail")).email,
        })
      );
      setChat((prev) => [...prev, { role: "user", content: transcript }]);
      addMessage("user", transcript, state);
    }
  };

  return (
    <>
      {!showRatingModal && <RippleEffect isPlaying={isPlaying} />}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        {loader && (
          <img
            style={{ width: "60px", height: "60px" }}
            src="/loader.gif"
            alt="loader"
          />
        )}
        {listeningLoader && (
          <span className="fade-in-text" style={{ fontSize: "24px" }}>
            Listening...
          </span>
        )}
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
        <audio ref={audioRef} onEnded={handleAudioEnded}>
          Your browser does not support the audio element.
        </audio>
      </div>
      {!showRatingModal && (
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
            open={toolTipOpen}
            sx={{ width: "1000 rem", color: "green" }}
            placement="top"
            title="Press and Hold to Speak Something"
          >
            <button
              // onClick={ChangeButtonFunctionHandler}
              onPointerDown={!isButtonDisabled ? handleMouseDown : () => {}}
              onPointerUp={!isButtonDisabled ? handleMouseUp : () => {}}
              // onTouchStart={!isButtonDisabled ? handleMouseDown : () => {}}
              // onTouchEnd={!isButtonDisabled ? handleMouseUp : () => {}}
              disabled={isButtonDisabled}
              id="micButton"
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
                <MicIcon id="MicImage" sx={{ width: "45px", height: "45px" }} />
              </div>
            </button>
          </CustomToolTip>
        </div>
      )}
    </>
  );
};

export default Helen;
