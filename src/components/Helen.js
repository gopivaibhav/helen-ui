import React from "react";
import "../styles/Menu.css";
import "../styles/Mic.css";
import { useEffect, useState, useRef } from "react";
import MicIcon from "@mui/icons-material/Mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Helen = ({ topic = "", filename, setProgress }) => {
  const { transcript, listening } = useSpeechRecognition();
  const [loader, setLoader] = useState(false);
  const [listeningLoader, setListeningLoader] = useState(false);
  const [chat, setChat] = useState([]);
  const [helenRippleEffect, setHelenRippleEffect] = useState(false);
  const [userRippleEffect, setUserRippleEffect] = useState(false);
  const [changeButtonFunction, setChangeButtonFunction] = useState(true);
  const [isHolding, setIsHolding] = useState(false);
  const [textArray, setTextArray] = useState([]);
  const [caption, setCaption] = useState("");
  const [sidecaption, setSideCaption] = useState("");
  const [isActivated, setIsActivated] = useState(false);

  let holdTimeout;
  const keyframes = {
    Mic: {
      '0%': {
        transform: 'scale(1)',
      },
      '25%': {
        transform: 'scale(1.25)',
      },
      '50%': {
        transform: 'scale(1.15)',
      },
      '100%': {
        transform: 'scale(1.4)',
      },
    },
  };
  

  const handleMouseDown = () => {
    // Set a timeout to detect the hold
    holdTimeout = setTimeout(() => {
      setIsHolding(true);
      setChangeButtonFunction(false);
      setListeningLoader(true);

      SpeechRecognition.startListening({
        language: "en-UK",
      });
      console.log("listening");
      console.log(listening);
    }, 100); // Adjust the duration as needed
  };

  const handleMouseUp = () => {
    // Clear the timeout when the mouse is released
    clearTimeout(holdTimeout);
    setTimeout(() => {
      // SpeechRecognition.abortListening({
      //   language: "en-UK",
      // });
      console.log("listening abort");
      console.log(listening);
    }, 100);

    setChangeButtonFunction(true);
    // Reset the holding state
    setIsHolding(false);
  };

  useEffect(() => {
    console.log(listening);
    if (!listening) {
      setUserRippleEffect(false);
      setListeningLoader(false);
      handleRequest();
    } else {
    }
  }, [listening]);
  const callAudio = () => {
    setTimeout(() => {
      setUserRippleEffect(true);
      setListeningLoader(true);
      if (listening) {
      }
      SpeechRecognition.startListening({ language: "en-UK", continuous: true });
      // setChangeButtonFunction(false);
    }, 500);
  };

  useEffect(() => {
    if (helenRippleEffect) {
      getTranscript();
    }
  }, [textArray]);

  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORT}/transcript/${filename}`, {})
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setTextArray(() => data);
        setHelenRippleEffect(true);
        const audio = new Audio(
          `${process.env.REACT_APP_PORT}/file/${filename}`
        );
        audio.muted = true;
        audio.play().then(() => {
          audio.muted = false;
        });
        // setChangeButtonFunction(!changeButtonFunction);
        setLoader(false);
        audio.onended = () => {
          console.log("ended");
          setHelenRippleEffect(false);
          // setChangeButtonFunction(!changeButtonFunction);
          // callAudio();
        };
      });
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
    console.log("API Request-", transcript);
    if (transcript && transcript.length >= 2) {
      sendAPIRequest(transcript);
    }
  };

  const sendAPIRequest = async (transcript) => {
    setChat((prev) => [...prev, { role: "user", content: transcript }]);
    setLoader(true);
    fetch(`${process.env.REACT_APP_PORT}/checkaudio?q=${transcript}`, {
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
        setTextArray(() => data.transcript);
        console.log(textArray);
        setProgress((data.total_count) * 4.5);
        const audio = new Audio(
          `${process.env.REACT_APP_PORT}/file/${data.filename}`
        );
        audio.muted = true;
        setHelenRippleEffect(true);
        audio.play().then(() => {
          audio.muted = false;
        });
        // setChangeButtonFunction(!changeButtonFunction);
        setLoader(false);
        audio.onended = () => {
          setHelenRippleEffect(false);
          // setChangeButtonFunction(!changeButtonFunction);
          // callAudio();
        };
        setChat((prev) => [...prev, { role: "assistant", content: data.AI }]);
      });
  }

  const getTranscript = () => {
    textArray.map((item, index) => {
      let time = item.timestamp[0].split(":")[2];
      let intTime = parseInt(time.replace(/,/g, ""), 10);
      setTimeout(() => {
        setCaption(item.text);
      }, intTime);
      if (index !== textArray.length - 1) {
        setTimeout(() => {
          setSideCaption(textArray[index + 1].text);
        }, intTime);
      } else {
        setTimeout(() => {
          setSideCaption("");
        }, intTime);
      }
    });
    // to clear the caption
    let time = textArray[textArray.length - 1].timestamp[1].split(":")[2];
    let intTime = parseInt(time.replace(/,/g, ""), 10);
    setTimeout(() => {
      setCaption("");
    }, intTime);
    return "data";
  };
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
            src="/helen.jpeg"
            alt="helen"
          />
        </div>
      </div>
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
          height: "32vh",
          textAlign: "center",
          color: "black",
          fontSize: 18,
          fontFamily: "Nunito Sans",
          fontWeight: "400",
          wordWrap: "break-word"
        }}
      >
        {caption !== "" && (
          <div id="caption-container">
            <span id="captiontext">{caption}</span>
          </div>
        )}
        <div id="caption-container">
          {/* <span id="captiontext">hello there my name is ramanujan and what is </span> */}
        </div>
        <div id="caption-container">
          {/* <span id="captiontext">hello</span> */}
        </div>
        {sidecaption !== "" && (
          <div id="caption-container">
            <span id="captiontext" style={{ opacity: "0.5" }}>{sidecaption}</span>
          </div>
        )}
      </div>
      {/* <div style={{ position: "absolute", right: 10, bottom: "20vh" }}>
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
          src="/user.png"
          alt="user"
        />
      </div> */}
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
          id="micButton"
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
            <MicIcon id="MicImage" sx={{ width: "45px", height: "45px" }} />
          </div>
        </button>
      </div>
    </>
  );
};

export default Helen;
