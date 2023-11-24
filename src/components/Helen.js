import React from "react";
import "../styles/Menu.css";

import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Helen = ({ topic = "" }) => {
  const { transcript, listening } = useSpeechRecognition();
  const [response, setResponse] = useState();
  const [chat, setChat] = useState([]);
  const [helenIcon, setHelenIcon] = useState("");
  const [fullText, setFullText] = useState("");
  useEffect(() => {
    let currentIndex = 0;
    setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setResponse(fullText.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 50); // Adjust the interval time as needed
      return () => clearInterval(intervalId); // Cleanup on component unmount
    }, 4000);
    console.log(fullText);
  }, [fullText]);
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
      setChat((prev) => [...prev, { "role": "user", "content": transcript }]);
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
          const audio = new Audio(
            `${process.env.REACT_APP_PORT}/file/${data.filename}`
          );
          audio.muted = false;
          setHelenIcon("./03.svg");
          audio.play();
          setFullText(data.AI);
          setChat((prev) => [...prev, { role: "assistant", content: data.AI }]);
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
            fontSize: 18,
            fontFamily: "Nunito Sans",
            fontWeight: "900",
            wordWrap: "break-word",
          }}
        >
          Helen Response - {response}
          <br />
          {chat.map((item) => {
            return (
              <div style={{ fontSize: "15px" }}>
                Chat so far with Helen-
                {item.role === "user" ? (
                  <div>USER - {item.content}</div>
                ) : (
                  <div>HELEN - {item.content}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Helen;
