// Menu.js
import React, { useState } from "react";
import "../styles/Menu.css";
import MenuItem from "./MenuItem";
import Helen from "./Helen";
import { Link } from "react-router-dom";

const Menu = ({ setTopic, setIsActive = () => {} }) => {
  return (
    <div className="menu-container App">
      <div className="menu-text">What's on your mind?</div>
      {/* <Link to="helen"> */}
      <MenuItem
        setTopic={setTopic}
        text="Feeling anxious"
        setIsActive={setIsActive}
      />
      {/* </Link> */}
      <MenuItem
        setTopic={setTopic}
        text="Work stress"
        setIsActive={setIsActive}
      />
      <MenuItem
        setTopic={setTopic}
        text="Struggling with a bad habit"
        setIsActive={setIsActive}
      />
    </div>
  );
};

export default Menu;
