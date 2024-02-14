"use client";
import React from "react"
import {
  LiveClient,
  LiveTranscriptionEvents,
  createClient,
} from "@deepgram/sdk";
import { useState, useEffect, useCallback, useRef } from "react";
import { useQueue } from "@uidotdev/usehooks";

import "../styles/Menu.css";
import "../styles/Mic.css";

// @ts-ignore
import RippleEffect from "../components/RippleEffect";
import Fade from "@mui/material/Fade";
import { withStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import MicIcon from "@mui/icons-material/Mic";
import { MicOff } from "@mui/icons-material";
// @ts-ignore
import { useWebSocket } from "../WebSocketProvider";
// import DisclaimerPopup from "../components/DisclaimerPopup";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

const addMessage = async (sender:string, content:string, session:string) => {
  const res = await axios.post(
    `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/session/${session}/messages`,
    {
      sender,
      content,
    }
  );
};

type SetProgressFunction = (value: number) => void;

interface MicrophoneProps {
  setProgress: SetProgressFunction;
}

const Microphone = ({ setProgress }: MicrophoneProps) => {
  const { add, remove, first, size, queue } = useQueue<any>([]);
  const [connection, setConnection] = useState<LiveClient | null>();
  const [isListening, setListening] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [micOpen, setMicOpen] = useState(false);
  const [microphone, setMicrophone] = useState<MediaRecorder | null>();
  const [userMedia, setUserMedia] = useState<MediaStream | null>();
  const [caption, setCaption] = useState<string | null>();
  const [connectDeepgram, setConnectDeepgram] = useState<boolean>(false)

  // Helen JS code
  const socket = useWebSocket();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // const [listeningLoader, setListeningLoader] = useState(false);
  const [updatedState, setUpdatedState] = useState('');
  const navigate = useNavigate();
  

  type BlobItem = {
    blob: string;
    counter: number;
    text: string;
  };
  type ChatItem = {
    role: string;
    content: string;
  };
  const [finalBlobs, setFinalBlobs] = useState<BlobItem[]>([]);
  const [chat, setChat] = useState<ChatItem[]>([]);
  // const [queue, setQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentBlobIndex = useRef(0);
  const [toolTipOpen, setToolTipOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const location = useLocation();
  const state = location.state.sessionId;

  type AudioResult = {
    text: string;
    blob: string;
  };
  
  const apiCallForAudio = (chunk: string): Promise<AudioResult> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("https://api.openai.com/v1/audio/speech", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "tts-1",
            input: chunk.replace('\n', ' '),
            voice: "nova",
            response_format: "aac",
            stream: true,
          }),
        });
  
        if (response.ok) {
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          resolve({text: chunk, blob: audioUrl });
        } else {
          reject(new Error(`Error generating speech: ${response.status} ${response.statusText}`));
        }
      } catch (error) {
        reject(new Error(`Error generating speech: ${error}`));
      }
    })
  }


  const playNextBlob = async () => {
    if (currentBlobIndex.current < finalBlobs.length) {
      setIsButtonDisabled(true);
      const foundObj = finalBlobs.filter(item =>{
        return item.counter === currentBlobIndex.current
      })
      if(foundObj.length > 0 && foundObj[0].blob !== ""){
        setIsPlaying(() => true);
        setCaption(() => foundObj[0].text);
        const openaiUrl = foundObj[0].blob;
        if(audioRef.current){
          audioRef.current.src = openaiUrl;
          audioRef.current.muted = true;
          audioRef.current
          .play()
          .then(() => {
            console.log("  Playing")
            setTimeout(() => {
              if(audioRef.current) audioRef.current.muted = false;
            }, 10);
          })
            .catch((e) => {
              console.log("ERROR in playing audio", e);
            });
          currentBlobIndex.current += 1
        }
      }
    }
  };

  const checkPlaying = () => {
    if (finalBlobs.length == currentBlobIndex.current + 1) {
      const foundObj = finalBlobs.filter(item =>{
        return item.counter === currentBlobIndex.current
      })
      if (foundObj.length > 0 && foundObj[0].text === "ALL DONE") {
        finalBlobs.sort((a, b) => a.counter - b.counter);
        setCaption("");
        let finalCaption = finalBlobs.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.text;
        }, "");
        finalCaption = finalCaption.replace("ALL DONE", "");
        console.log("Final Caption-", finalCaption)
          if (chat.length == 0) {
            setToolTipOpen(true);
            setConnectDeepgram(true);
          }
          setChat((prev) => [
            ...prev,
            { role: "assistant", content: finalCaption },
          ]);
          addMessage("assistant", finalCaption, state);
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
        if(socket.readyState === 1){
          const userDetailString = sessionStorage.getItem("userDetail");
          if (userDetailString !== null) {
            const userEmail = JSON.parse(userDetailString).email;
            socket.send(
              JSON.stringify({
                need: "openai",
                query: "",
                chat: chat,
                email: userEmail,
              }))
            console.log("sent req to openai")
          }
        }else{
          console.log('not opened')
          setTimeout(() => {
            sendMsg();
          }, 1000);
        }
        console.log(new Date().toLocaleTimeString(), 'sending req')
      }
      if(socket.readyState === 1){
        sendMsg();
      }else{
        console.log('not opened initially', socket)
        sendMsg();
        // socket.addEventListener("open", sendMsg);
      }
      socket.addEventListener("message", async(event: any) => {
        const message = event.data;
        if (typeof message === "string") {
          const res = JSON.parse(message);
          if (res.AI) {
            console.log(res.AI)
            if(res.AI !== "ALL DONE"){
              const { text, blob } = await apiCallForAudio(res.AI);
              // if(chat.length == 0)setConnectDeepgram(true)
              setFinalBlobs((prev) => [...prev, {blob: blob, counter: res.counter, text: text}]);
            }else{
              setFinalBlobs((prev) => [...prev, {blob: "", counter: res.counter, text: res.AI}]);
            }
          } else {
            console.log("Other logs-", res);
            if (res.percentage) setProgress(res.percentage);
            if(res.updated_state){
              console.log("updated state-", res.updated_state);
              setUpdatedState(res.updated_state);
            }
          }
        }else{
          console.log("Other message", typeof(message));
        }
      });
      socket.addEventListener("close", handleClose);
    }

    return () => {
      if (socket) {
        socket.removeEventListener("close", handleClose);
      }
    };
  }, [socket]);


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

  const handleRequest = (transcript: string) => {
    console.log("API Request-", transcript);
    const userDetailString = sessionStorage.getItem("userDetail");
    if (userDetailString !== null) {
      const userEmail = JSON.parse(userDetailString).email;
      socket.send(
        JSON.stringify({
          need: "openai",
          query: transcript,
          chat: chat,
          email: userEmail,
        }))
    }
    setChat((prev) => [...prev, { role: "user", content: transcript }]);
    addMessage("user", transcript, state);
  };

  // Complete Helen JS code

  const toggleMicrophone = useCallback(async () => {
    if (microphone && userMedia) {
      setUserMedia(null);
      setMicrophone(null);

      microphone.stop();
      setToolTipOpen(true)
    } else {
      setToolTipOpen(false)
      const userMedia = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const microphone = new MediaRecorder(userMedia);
      microphone.start(500);

      microphone.onstart = () => {
        setMicOpen(true);
        console.log("Microphone is open")
      };
      
      microphone.onstop = () => {
        setMicOpen(false);
        console.log("Microphone is closed")
      };

      microphone.ondataavailable = (e) => {
        add(e.data);
      };

      setUserMedia(userMedia);
      setMicrophone(microphone);
    }
  }, [add, microphone, userMedia]);

  useEffect(() => {
    if (process.env.REACT_APP_DEEPGRAM_API_KEY && connectDeepgram) {
      console.log("connecting to deepgram");
      const deepgram = createClient(process.env.REACT_APP_DEEPGRAM_API_KEY);
      console.log(deepgram, '80')
      const connection = deepgram.listen.live({
        model: "nova",
        interim_results: false,
        smart_format: true,
        // vad_events: true,
        endpointing: 6000
      });

      connection.on(LiveTranscriptionEvents.Open, () => {
        console.log("connection established");
        setListening(true);
      });

      connection.on(LiveTranscriptionEvents.Close, () => {
        console.log("connection closed");
        setListening(false);
        setConnection(null);
      });
      
      // connection.on(LiveTranscriptionEvents.SpeechStarted, (data) => {
      //   console.log("voice started", data);
      // });

      connection.on(LiveTranscriptionEvents.Transcript, (data) => {
        console.log(data)
        const words = data.channel.alternatives[0].words;
        const transcript = words
          .map((word: any) => word.punctuated_word ?? word.word)
          .join(" ");
        if (transcript !== "") {
          if(caption === undefined){
            console.log(transcript, 'in if')
            setCaption(transcript);
          }else{
            console.log(transcript, 'in else')
            setCaption((prev) => prev + " " + transcript);
          }
          handleRequest(transcript);
          // setLastSpoken(Date.now());
          // setTimeout(() => {
          //   checkSpoken()
          // }, 3000)
        }
      });

      setConnection(connection);
    }
  }, [connectDeepgram]);

  // const checkSpoken = () => {
  //   console.log("Checking time", Date.now() - lastSpoken);
  //   if (Date.now() - lastSpoken > 3000 && micOpen) {
  //     console.log("Spoken stopped");
  //     handleRequest();
  //   }
  // }

  useEffect(() => {
    const processQueue = async () => {
      if (size > 0 && !isProcessing) {
        setProcessing(true);

        if (isListening) {
          const blob = first;
          connection?.send(blob);
          remove();
        }

        const waiting = setTimeout(() => {
          clearTimeout(waiting);
          setProcessing(false);
        }, 250);
      }
    };

    processQueue();
  }, [connection, queue, remove, first, size, isProcessing, isListening]);

  return (
    <>
      <RippleEffect isPlaying={isPlaying} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        {isPressed && (
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
        <audio
          ref={audioRef}
          onEnded={handleAudioEnded}
          playsInline
        >
          Your browser does not support the audio element.
        </audio>
        {/* {!!userMedia && !!microphone && micOpen ? (
          <p>Speak to transcribe</p>
        ) : (
          <p>Click mic to Start the call</p>
        )} */}
      </div>
      {!false && (
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
            title="Click on mic to listen your voice"
          >
            <button
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
                transition: "all 0.1s ease-in",
                transform: isPressed ? "scale(1.4)" : "scale(1)",
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
                onClick={() => toggleMicrophone()}
              >
                {!micOpen ? (
                  <MicIcon id="MicImage" sx={{ width: "45px", height: "45px" }} />
                ) : (
                  <MicOff id="MicImage" sx={{ width: "45px", height: "45px" }} />
                  )}
              </div>
            </button>
          </CustomToolTip>
        </div>
      )}
    </>
  );

}


export default Microphone;