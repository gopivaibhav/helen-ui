import React from "react";
import "../styles/Menu.css";
import { useEffect, useState, useRef } from "react";
import MicIcon from "@mui/icons-material/Mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Helen = ({ topic = "" }) => {
  const { transcript, listening } = useSpeechRecognition();
  const [loader, setLoader] = useState(false);
  const [listeningLoader, setListeningLoader] = useState(false);
  const [chat, setChat] = useState([]);
  const [helenRippleEffect, setHelenRippleEffect] = useState(false);
  const [userRippleEffect, setUserRippleEffect] = useState(false);
  const [changeButtonFunction, setChangeButtonFunction] = useState(true);
  const [isHolding, setIsHolding] = useState(false);
  const [fsmState, setFsmState] = useState("Introduction");
  const [fsmCount, setFsmCount] = useState(1);
  let holdTimeout;

  const handleMouseDown = () => {
    // Set a timeout to detect the hold
    holdTimeout = setTimeout(() => {
      setIsHolding(true);
      setChangeButtonFunction(false);
      setListeningLoader(true);
      SpeechRecognition.startListening({
        language: "en-UK",
        continuous: "true"
      });
      console.log("listening");
      console.log(listening);
      // Add your tap and hold logic here
      console.log("Button tapped and held!");
    }, 100); // Adjust the duration as needed
  };

  const handleMouseUp = () => {
    // Clear the timeout when the mouse is released
    clearTimeout(holdTimeout);
    setTimeout(() => {
      SpeechRecognition.abortListening({
        language: "en-UK",
      });
      console.log("listening abort");
      console.log(listening);
    }, 2000);

    setChangeButtonFunction(true);
    // Reset the holding state
    setIsHolding(false);
  };

  useEffect(() => {
    console.log(listening);
    if (!listening) {
      console.log("sent an API request", transcript);
      setUserRippleEffect(false);
      setListeningLoader(false);
      handleRequest();
    } else {
    }
  }, [listening]);
  const callAudio = () => {
    setTimeout(() => {
      console.log("started listening");
      setUserRippleEffect(true);
      setListeningLoader(true);
      if (listening) {
      }
      SpeechRecognition.startListening({ language: "en-UK", continuous: true });
      console.log("listening>>>>>>>>>> ", listening);
      // setChangeButtonFunction(false);
    }, 500);
  };

  useEffect(() => {
    sendAPIRequest("");
  }, []);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  // const ChangeButtonFunctionHandler = () => {
  //   if (changeButtonFunction) {
  //     setListeningLoader(true);
  //     SpeechRecognition.startListening({
  //       language: "en-UK",
  //       continuos: true,
  //     });
  //     console.log("listening");
  //     console.log(listening);
  //   } else {
  //     SpeechRecognition.abortListening({
  //       language: "en-UK",
  //     });
  //     console.log("listening abort");
  //     console.log(listening);
  //   }
  //   setChangeButtonFunction(!changeButtonFunction);
  // };

  const handleRequest = () => {
    console.log(transcript);
    if (transcript && transcript.length >= 2) {
      console.log("initiated")
      sendAPIRequest(transcript);
    }
  };

  const sendAPIRequest = async (transcript) => {
    setChat((prev) => [...prev, { role: "user", content: transcript }]);
    setLoader(true);
    fetch(`${process.env.REACT_APP_PORT}/checkaudio/${fsmCount}?q=${transcript}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat: chat,
      }),
    })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      const audio = new Audio(
        `${process.env.REACT_APP_PORT}/file/${data.filename}`
        );
      audio.muted = true;
      audio.play().then(() => {
        audio.muted = false;
      });
      if(fsmState === data.nextstate){
        setFsmCount((prev) => prev + 1)
      }else{
        setFsmCount(1);
        setFsmState(data.nextstate);
        console.log("count made 1")
      }
      setHelenRippleEffect(true);
      // setChangeButtonFunction(!changeButtonFunction);
      setLoader(false);
      audio.onended = () => {
        console.log("ended");
        setHelenRippleEffect(false);
        // setChangeButtonFunction(!changeButtonFunction);
        // callAudio();
      };
      setChat((prev) => [...prev, { role: "assistant", content: data.AI }]);
    });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: " 50%",
            border: "none",
            outline: "none",
          }}
        >
          <div className={helenRippleEffect ? "ripple-effect-helen" : ""} />
          <img
            style={{
              width: "200px",
              height: "200px",
              borderRadius: 9999,
              boxShadow: "0px 1px 30px rgba(0, 0, 0, 0.2)",
            }}
            src="./helen.jpeg"
            alt="helen"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60px",
          marginTop: "27px",
        }}
      >
        {loader && (
          <img
            style={{ width: "60px", height: "60px" }}
            src="./loader.gif"
            alt="loader"
          />
        )}
        {listeningLoader && (
          <span className="fade-in-text" style={{ fontSize: "24px" }}>
            Listening...
          </span>
        )}
      </div>
      {/* <div
        style={{
          width: "100%",
          height: "40vh",
          textAlign: "center",
          color: "black",
          fontSize: 18,
          fontFamily: "Nunito Sans",
          fontWeight: "400",
          wordWrap: "break-word",
          marginBottom: 10
        }}
      >
        {transcript}
      </div> */}
      <div style={{ position: "absolute", right: 10, bottom: "20vh" }}>
        <div className={userRippleEffect ? "ripple-effect-user" : ""} />
        <img
          style={{
            width: "90px",
            height: "100px",
            background: "#FF7777",
            borderRadius: 5,
            backdropFilter: "blur(10px)",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
          src="./user.png"
          alt="user"
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "100px",
          background: "#FF7777",
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
        <button
          // onClick={ChangeButtonFunctionHandler}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          style={{
            width: "100px",
            height: "100px",
            background: "white",
            borderRadius: "50%",
            borderColor: "white",
            textAlign: "center",
            color: "#FF7777",
            fontSize: 40,
            border: "none",
            fontFamily: "Nunito Sans",
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
              background: "#FF7777",
              borderRadius: "50%",
              textAlign: "center",
              color: "white",
              borderColor: "white",
              fontSize: 12,
              fontFamily: "Nunito Sans",
              fontWeight: "700",
              wordWrap: "break-word",
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MicIcon sx={{ width: "45px", height: "45px" }} />
          </div>
        </button>
      </div>
    </>
  );
};

export default Helen;
