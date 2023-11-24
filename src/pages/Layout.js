import React, { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Helen from "../components/Helen";

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const [topic, setTopic] = useState("");
  return (
    <div className="App">
      <Header setIsActive={setIsActive}/>
      <Helen/>
      {/* {isActive === true ? (
        <Helen topic = {topic}/>
      ) : (
        <Menu setTopic = {setTopic} setIsActive={setIsActive} />
      )} */}
    </div>
  );
};

export default Layout;
