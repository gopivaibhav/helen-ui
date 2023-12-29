import React, { useState } from "react";
import SessionHeader from "../components/SessionHeader";
import SessionContent from "../components/SessionContent";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Session = () => {
  const [data, setData] = useState({});
  const location = useLocation();
  const sessionId = location.state.sessionId;
  const key = location.state.key;
  console.log("session content main sessionId >>>>> ", sessionId);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(
          `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/session/${sessionId}`
        );
        await setData(res.data);
      } catch (error) {
        console.log("fetch session info error: ", error);
      }
    };
    fetchSession();
  }, [sessionId]);

  console.log("data from session >>>> ", data);
  return (
    <>
    <SessionHeader createdAt={data.createdAt} updatedAt={data.updatedAt} key = {key}/>
      <SessionContent />
    </>
  );
};

export default Session;
