import { Device } from "twilio-client";
import React, { useEffect, useState } from "react";

function CallComponent() {
  const [message, setMessage] = useState("");
  const [device, setDevice] = useState(null);

  const handleStart = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PORT}/token`);
      const data = await response.json();
      console.log(data.token);
      const token = data.token;
      const newDevice = new Device(token);
      console.log(newDevice, "17");
      setDevice(newDevice);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  const handleCall = async() => {
    if (device) {
      console.log("28");
      // const connection = device.connect();
      // let call = await device.connect({ 
      //   params: {
      //     To: '+917569786588',
      //     agent: 'Helen'
      //   } 
      // });
      device.on("registered", () => {
        console.log("Device is registered");
      })
      // connection.on("accept", () => {
      //   setMessage("Call connected!");
      // });
      // connection.on("disconnect", () => {
      //   setMessage("Call ended.");
      // });
      device.on('error', (deviceError) => {
        console.log(deviceError, "33")
      });
      // setMessage("Calling...");
    }
  };

  return (
    <div>
      <button onClick={handleCall}>Make Call</button>
      <button onClick={handleStart}>START</button>
      <p>{message}</p>
    </div>
  );
}

export default CallComponent;
