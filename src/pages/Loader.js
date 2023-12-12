import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Loader = () => {
    const [fileName, setFileName] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        if(fileName !== ""){
            navigate(`/helen/${fileName}`);
        }
    }, [fileName]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_PORT}/checkaudio/1?q=`, {
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
    return (
        <div className="App">
            Loading...
        </div>
    );
};

export default Loader;
