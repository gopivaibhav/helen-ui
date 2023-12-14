import React, { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Helen from "../components/Helen";
import { useParams } from "react-router-dom";

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const [topic, setTopic] = useState("");
  const [progress, setProgress] = useState(4.5);
  const params = useParams();
  return (
    <div className="App">
      <Header setIsActive={setIsActive} progress={progress}/>
      <Helen filename={params.filename} setProgress={setProgress}/>
      {/* {isActive === true ? (
        <Helen topic = {topic}/>
      ) : (
        <Menu setTopic = {setTopic} setIsActive={setIsActive} />
      )} */}
    </div>
  );
};

export default Layout;
