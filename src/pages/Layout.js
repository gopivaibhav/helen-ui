import React, { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Helen from "../components/Helen";
import { useLocation, useParams } from "react-router-dom";

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const [topic, setTopic] = useState("");
  const [progress, setProgress] = useState(4.5);
  const params = useParams();
  const location = useLocation();
  return (
    <div className="App">
      <Header setIsActive={setIsActive} progress={progress}/>
      <Helen setProgress={setProgress} />
      {/* {isActive === true ? (
        <Helen topic = {topic}/>
      ) : (
        <Menu setTopic = {setTopic} setIsActive={setIsActive} />
      )} */}
    </div>
  );
};

export default Layout;
