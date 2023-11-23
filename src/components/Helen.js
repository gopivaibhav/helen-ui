import React from "react";
import "../styles/Menu.css";

import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Helen = ({ topic }) => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const [response, setResponse] = useState();
  const [helenIcon, setHelenIcon] = useState("");
  useEffect(() => {
    console.log(listening);
    if (!listening) {
      console.log("sent an API request", transcript);
      setHelenIcon("./02.svg");
      handleRequest();
    } else {
      setHelenIcon("./01.gif");
    }
  }, [listening]);
  const callAudio = () => {
    setTimeout(() => {
      console.log("started listening");
      if (listening) {
        setHelenIcon("./03.svg");
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
      fetch(`${process.env.REACT_APP_PORT}/checkaudio?q=${transcript}`, {
        method: "GET",
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          setResponse(data.AI);
          const audio = new Audio(
            `${process.env.REACT_APP_PORT}/file/${data.filename}`
          );
          audio.muted = false;
          setHelenIcon("./03.svg");
          audio.play();
          audio.onended = () => {
            console.log("ended");
            callAudio();
          };
          setHelenIcon("./02.svg");
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
          onClick={() => {
            SpeechRecognition.startListening({
              language: "en-UK",
              continuos: true,
            });
            console.log("listening");
            console.log(listening);
          }}
        >
          <img src={helenIcon} alt="voice assistant" />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          color: "black",
          fontSize: 24,
          fontFamily: "Nunito Sans",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        {transcript}
      </div>
      {response && (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            color: "black",
            fontSize: 32,
            fontFamily: "Nunito Sans",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          {response}
        </div>
      )}
    </>
  );
};

export default Helen;
