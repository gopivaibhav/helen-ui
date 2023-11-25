import React from "react";
import "../styles/Menu.css";

import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Helen = ({ topic = "" }) => {
  const { transcript, listening } = useSpeechRecognition();
  const [loader, setLoader] = useState(false);
  const [chat, setChat] = useState([]);
  const [helenRippleEffect, setHelenRippleEffect] = useState(false);
  const [userRippleEffect, setUserRippleEffect] = useState(false);

  useEffect(() => {
    console.log(listening);
    if (!listening) {
      console.log("sent an API request", transcript);
      setUserRippleEffect(false);
      handleRequest();
    } else {
    }
  }, [listening]);
  const callAudio = () => {
    setTimeout(() => {
      console.log("started listening");
      setUserRippleEffect(true);
      if (listening) {
      }
      SpeechRecognition.startListening({ language: "en-UK", continuos: true });
      console.log("listening>>>>>>>>>> ", listening);
    }, 3000);
  };

  useEffect(() => {
    callAudio();
  }, []);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  const handleRequest = () => {
    console.log(transcript);
    if (transcript && transcript.length >= 2) {
      setChat((prev) => [...prev, { role: "user", content: transcript }]);
      setLoader(true);
      fetch(`https://therapy-iiitl.koyeb.app/checkaudio?q=${transcript}`, {
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
            `https://therapy-iiitl.koyeb.app/file/${data.filename}`
          );
          audio.muted = false;

          audio.play();
          setHelenRippleEffect(true);
          setLoader(false);
          setChat((prev) => [...prev, { role: "assistant", content: data.AI }]);
          audio.onended = () => {
            console.log("ended");
            setHelenRippleEffect(false);
            callAudio();
          };
        });
    }
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
            style={{ width: "200px", height: "200px", borderRadius: 9999 }}
            src="./helen-photo.png"
            alt="helen"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "99px",
        }}
      >
        {loader && (
          <img
            style={{ width: "99px", height: "99px" }}
            src="./loader.gif"
            alt="loader"
          />
        )}
      </div>
      <div style={{ position: "absolute", right: 10, bottom: "20vh", }}>
        <div className={userRippleEffect ? "ripple-effect-user" : ""} />
        <img
          style={{
            width: "90px",
            height: "90px",
            background: "grey",
            borderRadius: 5,
          }}
          src="./user.png"
          alt="helen"
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
        <div
          onClick={() => {
            SpeechRecognition.startListening({
              language: "en-UK",
              continuos: true,
            });
            console.log("listening");
            console.log(listening);
          }}
          style={{
            width: "238px",
            height: "61px",
            background: "white",
            borderRadius: 14,
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "#FF7777",
              fontSize: 40,
              fontFamily: "Nunito Sans",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            Start
          </div>
        </div>
      </div>
    </>
  );
};

export default Helen;
