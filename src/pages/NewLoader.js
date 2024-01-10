import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useWebSocket } from "../WebSocketProvider";

const NewLoader = ({ setLoader }) => {
//   const socket = useWebSocket();
  useEffect(() => {
    // const handleClose = () => {
    //   console.log("WebSocket connection ended");
    // };

    // if (socket) {
    //   console.log("in new loader");
    //   socket.send(
    //     JSON.stringify({
    //       need: "reset",
    //       email: JSON.parse(sessionStorage.getItem("userDetail")).email,
    //     })
    //   );
    //   socket.send(
    //     JSON.stringify({
    //       need: "changefirst",
    //       email: JSON.parse(sessionStorage.getItem("userDetail")).email,
    //     })
    //   );
      setTimeout(() => {
        setLoader(() => false);
      }, 2000);
    //   socket.addEventListener("close", handleClose);
    // }
    // return () => {
    //   if (socket) {
    //     socket.removeEventListener("close", handleClose);
    //   }
    // };
  }, []);
  const letters = Array.from("Setting Things Up For You");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
        flexDirection: "column",
      }}
    >
      <img src={"/clock.gif"} alt="loader" />
      <motion.div
        style={{ display: "flex", fontSize: "1.5rem" }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default NewLoader;
