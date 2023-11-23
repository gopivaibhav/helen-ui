// MenuItem.js
import React from "react";

const MenuItem = ({ setTopic, text, setIsActive = () => {} }) => {
  const handleClick = () => {
    setIsActive(true);
    setTopic(text);
  };
  return (
    <div className="menu-item-container" onClick={handleClick}>
      <div className="menu-item">
        <div className="menu-text-content">{text}</div>
      </div>
    </div>
  );
};

export default MenuItem;
