import React from "react";
import "../styles/Menu.css";
import "../styles/Mic.css";
import { useEffect, useState, useRef } from "react";
import MicIcon from "@mui/icons-material/Mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useWebSocket } from '../WebSocketProvider';

const Helen = ({ topic = "", setProgress }) => {
  const socket = useWebSocket();

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

  const [blobQueue, setBlobQueue] = useState([]);
  const [finalBlobs, setFinalBlobs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playedBlobIds, setPlayedBlobIds] = useState([]);

  function concatenateBlobs(blobs) {
    return new Promise((resolve, reject) => {
      const blobParts = [];
      const reader = new FileReader();
      let currentIndex = 0;
  
      function readNextBlob() {
        if (currentIndex < blobs.length) {
          reader.readAsArrayBuffer(blobs[currentIndex]);
        } else {
          const concatenatedBlob = new Blob(blobParts, { type: blobs[0].type });
          resolve(concatenatedBlob);
        }
      }
  
      reader.onloadend = () => {
        blobParts.push(reader.result);
        currentIndex++;
        readNextBlob();
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      readNextBlob();
    });
  }
  
  useEffect(() => {
    if (blobQueue.length >= 2) {
      console.log(blobQueue, 'blobs');
      const blobsToCombine = blobQueue.slice(0, 2); // Taking the first 2 blobs
  
      concatenateBlobs(blobsToCombine)
        .then((resultantBlob) => {
          setFinalBlobs((prev) => [...prev, resultantBlob]);
          setBlobQueue((prevQueue) => prevQueue.slice(2)); // Remove the first 2 blobs
        })
        .catch((error) => {
          console.error('Error concatenating blobs:', error);
        });
    }
  }, [blobQueue]);
  
  useEffect(() => {
    if (finalBlobs.length > 0 && !isPlaying) {
      setIsPlaying(true);
      setHelenRippleEffect(true);
      const currentBlob = finalBlobs[0];
      const blobId = currentBlob.uniqueId || Date.now(); // Assign a unique identifier if not present
      if (!playedBlobIds.includes(blobId)) {
        setPlayedBlobIds((prev) => [...prev, blobId]);
        
        const audioUrl = URL.createObjectURL(currentBlob);
        const audio = new Audio(audioUrl);
  
        audio.play()
          .then(() => {
            console.log('Playing audio');
          })
          .catch((err) => {
            console.log(err);
            setChat((prev) => [...prev, { role: "assistant", content: caption }]);
          });
  
        audio.onended = () => {
          setFinalBlobs((prev) => prev.slice(1));
          setHelenRippleEffect(false);
          setIsPlaying(false);
        };
  
      } else {
        // Skip if the blob has already been played
        setFinalBlobs((prev) => prev.slice(1));
      }
    }
  
    if (finalBlobs.length === 0) {
      if(blobQueue.length > 0){
        setFinalBlobs((prev) => [...prev, blobQueue[0]]);
        setBlobQueue((prevQueue) => prevQueue.slice(1));
      }
      else{
        setChat((prev) => [...prev, { role: "assistant", content: caption }]);
        setCaption('');
      }
    }
  }, [finalBlobs, isPlaying, playedBlobIds]);
  

  let holdTimeout;
  async function groupWordsInParagraph(paragraph) {
    const words = paragraph.split(/\s+/);
    const groupedWords = [];

    for (let i = 0; i < words.length; i += 10) {
      const chunk = words.slice(i, i + 10).join(" ");
      groupedWords.push(chunk);
    }

    await setTextArray(groupedWords);
    return groupedWords;
  }

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

  useEffect(() => {
    const handleClose = () => {
      console.log('WebSocket connection ended');
    };

    if (socket) {
      socket.send(JSON.stringify({'need': 'reset'}))
      socket.send(JSON.stringify({'need': 'openai', 'query': '', 'chat': chat }))
      socket.addEventListener('message', (event) => {
        const message = event.data;
        if(typeof(message) === 'string'){
          const res = JSON.parse(message)
          if(res.AI)setCaption((prev) => prev + JSON.parse(message).AI);
          else {
            console.log('state', res)
            setProgress(res.total_count * 4.5)
          }
        }else{
          console.log('blob', message, typeof(message))
          setBlobQueue((prevQueue) => [...prevQueue, message]);
        }
      
      });
      socket.addEventListener('close', handleClose);
    }

    return () => {
      if (socket) {
        socket.removeEventListener('close', handleClose);
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

  const handleRequest = () => {
    console.log("API Request-", transcript);
    if (transcript && transcript.length >= 2) {
      // sendAPIRequest(transcript);
      socket.send(JSON.stringify({'need': 'openai', 'query': transcript, 'chat': chat }))
      setChat((prev) => [...prev, { role: "user", content: transcript }]);
      console.log('sent')
    }
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


  const getTranscript = () => {
    let intTime;
    textArray.map((item, index) => {
      intTime = 3600 * index;
      setTimeout(() => {
        setCaption(item);
      }, intTime);
    });
    setTimeout(() => {
      setCaption("");
    }, intTime + 2000);
    return "data";
  };

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
          height: "25vh",
          textAlign: "center",
          color: "black",
          fontSize: 18,
          fontFamily: "Nunito Sans",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        {/* {caption !== "" && (
          <div id="caption-container">
            <span id="captiontext">{caption}</span>
          </div>
        )} */}
        <div id="caption-container">
          {/* <span id="captiontext">hello there my name is ramanujan and what is </span> */}
        </div>
        <div id="caption-container">
          {/* <span id="captiontext">hello</span> */}
        </div>
        {/* {sidecaption !== "" && (
          <div id="caption-container">
            <span id="captiontext" style={{ opacity: "0.5" }}>
              {sidecaption}
            </span>
          </div>
        )} */}
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
