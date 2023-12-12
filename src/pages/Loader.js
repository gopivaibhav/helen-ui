import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Loader = () => {
    const [fileName, setFileName] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        if(fileName !== ""){
            navigate(`/helen/${fileName}`);
        }
    }, [fileName]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_PORT}/checkaudio?q=`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat: [],
            })
          })
          .then((data) => {
            return data.json();
          }).then((data) => {
            console.log(data);
            setFileName(data.filename);
          })
    },[]);

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
          <img src={'/clock.gif'} alt="loader"/>
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

export default Loader;
