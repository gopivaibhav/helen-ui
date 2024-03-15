"use client";
import { useEffect, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import axios from "axios";
// import { useWebSocket } from "../WebSocketProvider";

const agentId = process.env.REACT_APP_RETELL_AGENT;

const webClient = new RetellWebClient();
const CallInterface = () => {
  // const socket = useWebSocket();
  const [isCalling, setIsCalling] = useState(false);
  const [caption, setCaption] = useState("");
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

  // useEffect(() => {
  //   const handleClose = () => {
  //     console.log("WebSocket connection ended");
  //   };
  //   if (socket) {
  //     const sendMsg = () => {
  //       if(socket.readyState === 1){
  //         // socket.send(
  //         //   JSON.stringify({
  //         //     need: "openai",
  //         //     query: "",
  //         //     chat: chat,
  //         //     email: JSON.parse(sessionStorage.getItem("userDetail")).email,
  //         //   })
  //         // );
  //         console.log("sent req to openai");
  //       }else{
  //         console.log('not opened')
  //         setTimeout(() => {
  //           sendMsg();
  //         }, 1000);
  //       }
  //       console.log(new Date().toLocaleTimeString(), 'sending req')
  //     }
  //     if(socket.readyState === 1){
  //       sendMsg();
  //     }else{
  //       console.log('not opened initially', socket)
  //       sendMsg();
  //       // socket.addEventListener("open", sendMsg);
  //     }
  //     socket.addEventListener("message", async(event) => {
  //       const message = event.data;
  //       console.log("message", message);
  //       // if (typeof message === "string") {
  //       //   const res = JSON.parse(message);
  //       //   if (res.AI) {
  //       //     console.log(res.AI)
  //       //     if(res.AI !== "ALL DONE"){
  //       //       const { text, blob } = await apiCallForAudio(res.AI);
  //       //       setFinalBlobs((prev) => [...prev, {blob: blob, counter: res.counter, text: text}]);
  //       //     }else{
  //       //       setFinalBlobs((prev) => [...prev, {blob: "", counter: res.counter, text: res.AI}]);
  //       //     }
  //       //   } else {
  //       //     console.log("Other logs-", res);
  //       //     if (res.percentage) setProgress(res.percentage);
  //       //     if(res.updated_state){
  //       //       console.log("updated state-", res.updated_state);
  //       //       setUpdatedState(res.updated_state);
  //       //     }
  //       //   }
  //       // }else{
  //       //   console.log("Other message", typeof(message));
  //       // }
  //     });
  //     socket.addEventListener("close", handleClose);
  //   }

  //   return () => {
  //     if (socket) {
  //       socket.removeEventListener("close", handleClose);
  //     }
  //   };
  // }, [socket]);
  useEffect(()=>{
    console.log(caption)
  }, [caption])
  async function registerCall(agentId) {
    try {
      // Replace with your server url
      const response = await axios.post(
        "http://localhost:8000/register-call-on-your-server",
        {
          agent_id: agentId,
          email: JSON.parse(sessionStorage.getItem("userDetail")).email
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
      // setImgsrc("/icons/MicroPhone.svg");
    } else {
      setMute("Unmute");
      // setImgsrc("/icons/MicroPhoneMuted.svg");
    }
  };
  return (
    <div>
      {/* <Footer mute={mute} setMute={setMute} toggleConversation={toggleConversation} webClient={webClient} /> */}
      <div style={{ display: "flex" }}>
        <button onClick={handleButtonClick}>
          <span style={{ width: "62px", color: "black" }}>{mute}</span>
        </button>
        <button
          onClick={() => {
            webClient.stopConversation();
            // history.push("/usc");
          }}
        >
          Leave
        </button>
      </div>
      <div>{caption}</div>
    </div>
  );
};

export default CallInterface;