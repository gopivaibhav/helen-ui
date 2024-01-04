import React from "react";
import "../styles/Menu.css";
import "../styles/Mic.css";
import RippleEffect from "./RippleEffect";
import Fade from "@mui/material/Fade";
import { withStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState, useRef } from "react";
import MicIcon from "@mui/icons-material/Mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useWebSocket } from "../WebSocketProvider";
import { useAuth0 } from "@auth0/auth0-react";
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
const Helen = ({ topic = "", setProgress }) => {
  const socket = useWebSocket();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { transcript, listening } = useSpeechRecognition();
  const [loader, setLoader] = useState(false);
  const [listeningLoader, setListeningLoader] = useState(false);
  const [chat, setChat] = useState([]);
  const [changeButtonFunction, setChangeButtonFunction] = useState(true);
  const [isHolding, setIsHolding] = useState(false);
  const [textArray, setTextArray] = useState([]);
  const [caption, setCaption] = useState("");
  const [words, setWords] = useState([]);

  const [finalBlobs, setFinalBlobs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const currentBlobIndex = useRef(0);
  const [toolTipOpen, setToolTipOpen] = useState(false);

  // const playCaptions = () => {
  //   setCaption('');
  //   console.log('words- ', words.length, capIndex)
  //   if ((words.length - capIndex) >= 10) {
  //     for (let i = 0; i < 10; i++) {
  //       setCaption((prev) => (prev + words[capIndex + i]));
  //     }
  //     setCapIndex((prev) => (prev + 10));
  //     setTimeout(playCaptions, 3600);
  //   } else {
  //     for (let i = capIndex; i < words.length; i++) {
  //       setCaption((prev) => (prev + words[i]));
  //     }
  //     setCapIndex(0);
  //     setCaption('');
  //   }
  // };

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    console.log("context menu");
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
    // Set a timeout to detect the hold
    holdTimeout = setTimeout(() => {
      setIsHolding(true);
      setChangeButtonFunction(false);
      setListeningLoader(true);
      setToolTipOpen(false);
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
      setListeningLoader(false);
      handleRequest();
    } else {
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
        console.log("playing audio without error");
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
      socket.send(
        JSON.stringify({
          need: "openai",
          query: "",
          chat: chat,
          email: JSON.parse(sessionStorage.getItem("userDetail")).email,
        })
      );
      socket.addEventListener("message", (event) => {
        const message = event.data;
        if (typeof message === "string") {
          const res = JSON.parse(message);
          if (res.AI) {
            console.log(res.AI);
            setTextArray((prev) => [...prev, res.AI]);
          } else {
            console.log("state", res);
            if (res.done) {
              setTextArray((prev) => [...prev, " ALL DONE "]);
            }
            if (res.total_count) setProgress(res.total_count * 4.5);
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

  // const callAudio = () => {
  //   setTimeout(() => {
  //     setUserRippleEffect(true);
  //     setListeningLoader(true);
  //     if (listening) {
  //     }
  //     SpeechRecognition.startListening({ language: "en-UK", continuous: true });
  //     // setChangeButtonFunction(false);
  //   }, 500);
  // };

  // useEffect(() => {
  //   if (helenRippleEffect) {
  //     getTranscript();
  //   }
  // }, [textArray]);

  // useEffect(() => {
  //   if (playNow) {
  //     if(remainingFile !== "none") {
  //       const audio = new Audio(
  //         `${process.env.REACT_APP_PORT}/file/${remainingFile}`
  //       );
  //       audio.play().then(async () => {
  //         console.log("captions ended here");
  //         await groupWordsInParagraph(remainingText);
  //       });
  //       audio.onended = () => {
  //         setHelenRippleEffect(false);
  //         // setLoader(false);
  //       }
  //     }
  //   }
  // }, [playNow, remainingFile]);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_PORT}/transcript/${filename}`, {})
  //   .then((data) => {
  //       return data.json();
  //     })
  //     .then(async (data) => {
  //       // const aiInfo = await groupWordsInParagraph(aiData);
  //       // setTextArray(aiInfo);
  //       setHelenRippleEffect(true);
  //       const audio = new Audio(
  //         `${process.env.REACT_APP_PORT}/file/${filename}`
  //       );
  //       audio.muted = true;
  //       audio.play().then(async () => {
  //         const aiInfo = await groupWordsInParagraph(aiData);
  //         audio.muted = false;
  //       });
  //       // setChangeButtonFunction(!changeButtonFunction);
  //       setLoader(false);
  //       audio.onended = () => {
  //         console.log("ended");
  //         setHelenRippleEffect(false);
  //         // setChangeButtonFunction(!changeButtonFunction);
  //         // callAudio();
  //         setLoader(false);
  //       };
  //     });
  // }, []);

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
    // else if (transcript === "" && !toolTipOpen) {
    //   console.log("speak something");
    //   setToolTipOpen(true);
    //   setTimeout(() => {
    //     setToolTipOpen(false);
    //   }, 2000);
    // }
  };

  // const sendAPIRequest = async (transcript) => {
  //   setChat((prev) => [...prev, { role: "user", content: transcript }]);
  //   setLoader(true);
  //   fetch(`${process.env.REACT_APP_PORT}/streaming?q=Thanks for letting me know.`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       chat: [],
  //     }),
  //   })
  //     .then((data) => {
  //       return data.json();
  //     })
  //     .then((data) => {
  //       console.log(data, 'stream response'); // check for progress bar total count
  //       fetch(`${process.env.REACT_APP_PORT}/text/2`).then((data) => {
  //         return data.json();
  //       }).then(async(data) => {
  //         console.log(data, 'response from text- stream 2')
  //           let aiResponse = data.text
  //           setHelenRippleEffect(true);
  //           const audio = new Audio(
  //             `${process.env.REACT_APP_PORT}/file/${data.filename}`
  //           );
  //           audio.play().then(async () => {
  //             console.log("captions started");
  //             await groupWordsInParagraph(data.text);
  //             fetch(`${process.env.REACT_APP_PORT}/text/1`).then((data) => {
  //               return data.json()
  //             }).then((data) => {
  //               console.log(data, 'response from text- stream 1')
  //               aiResponse += data.text
  //               setRemainingText(data.text);
  //               setRemainingFile(data.filename);
  //             })
  //           });
  //           audio.onended = () => {
  //             console.log("captions ended here");
  //             setPlayNow(true)
  //           }
  //           setChat((prev) => [...prev, { role: "assistant", content: aiResponse }]);
  //           // setChangeButtonFunction(!changeButtonFunction);
  //       })
  //       // console.log(data);
  //       // console.log(textArray);
  //       // setProgress(data.total_count * 4.5);
  //       // const audio = new Audio(
  //       //   `${process.env.REACT_APP_PORT}/file/${data.filename}`
  //       // );
  //       // audio.muted = true;
  //       // setHelenRippleEffect(true);
  //       // audio.play().then(async () => {
  //       //   await groupWordsInParagraph(data.AI);
  //       //   audio.muted = false;
  //       // });
  //       // // setChangeButtonFunction(!changeButtonFunction);
  //       // setLoader(false);
  //       // audio.onended = () => {
  //       //   setHelenRippleEffect(false);
  //       //   // setChangeButtonFunction(!changeButtonFunction);
  //       //   // callAudio();
  //       // };
  //     });
  // };

  // const sendAPIRequest = async (transcript) => {
  //   setChat((prev) => [...prev, { role: "user", content: transcript }]);
  //   setLoader(true);
  //   fetch(`${process.env.REACT_APP_PORT}/checkaudio?q=${transcript}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       chat: chat,
  //     }),
  //   })
  //     .then((data) => {
  //       return data.json();
  //     })
  //     .then(async (data) => {
  //       console.log(data);
  //       console.log(textArray);
  //       setProgress(data.total_count * 4.5);
  //       const audio = new Audio(
  //         `${process.env.REACT_APP_PORT}/file/${data.filename}`
  //       );
  //       audio.muted = true;
  //       setHelenRippleEffect(true);
  //       audio.play().then(async () => {
  //         await groupWordsInParagraph(data.AI);
  //         audio.muted = false;
  //       });
  //       // setChangeButtonFunction(!changeButtonFunction);
  //       setLoader(false);
  //       audio.onended = () => {
  //         setHelenRippleEffect(false);
  //         // setChangeButtonFunction(!changeButtonFunction);
  //         // callAudio();
  //       };
  //       setChat((prev) => [...prev, { role: "assistant", content: data.AI }]);
  //     });
  // };

  // const getTranscript = () => {
  //   let intTime;
  //   textArray.map((item, index) => {
  //     intTime = 3600 * index;
  //     setTimeout(() => {
  //       setCaption(item);
  //     }, intTime);
  //   });
  //   setTimeout(() => {
  //     setCaption("");
  //   }, intTime + 2000);
  //   return "data";
  // };

  // const getTranscript = () => {
  //   textArray.map((item, index) => {
  //     let time = item.timestamp[0].split(":")[2];
  //     let intTime = parseInt(time.replace(/,/g, ""), 10);
  //     setTimeout(() => {
  //       setCaption(item.text);
  //     }, intTime);
  //     if (index !== textArray.length - 1) {
  //       setTimeout(() => {
  //         setSideCaption(textArray[index + 1].text);
  //       }, intTime);
  //     } else {
  //       setTimeout(() => {
  //         setSideCaption("");
  //       }, intTime);
  //     }
  //   });
  //   // to clear the caption
  //   let time = textArray[textArray.length - 1].timestamp[1].split(":")[2];
  //   let intTime = parseInt(time.replace(/,/g, ""), 10);
  //   setTimeout(() => {
  //     setCaption("");
  //   }, intTime);
  //   return "data";
  // };

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
        {/* <button
          onClick={() => {
            socket.send(
              JSON.stringify({
                need: "openai",
                query: "",
                chat: chat,
                email: JSON.parse(sessionStorage.getItem("userDetail")).email,
              })
            );
          }}
        >
          Start Therapy
        </button> */}
        <audio ref={audioRef} onEnded={handleAudioEnded}>
          Your browser does not support the audio element.
        </audio>
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
            onMouseDown={!isButtonDisabled ? handleMouseDown : () => {}}
            onMouseUp={!isButtonDisabled ? handleMouseUp : () => {}}
            onTouchStart={!isButtonDisabled ? handleMouseDown : () => {}}
            onTouchEnd={!isButtonDisabled ? handleMouseUp : () => {}}
            disabled={isButtonDisabled}
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
                background: "#FF7777",
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
    </>
  );
};

export default Helen;
