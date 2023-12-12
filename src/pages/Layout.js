import React, { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Helen from "../components/Helen";
import { useParams } from "react-router-dom";

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const [topic, setTopic] = useState("");
  const params = useParams();
  return (
    <div className="App">
      <Header setIsActive={setIsActive}/>
      <Helen filename={params.filename}/>
      {/* {isActive === true ? (
        <Helen topic = {topic}/>
      ) : (
        <Menu setTopic = {setTopic} setIsActive={setIsActive} />
      )} */}
    </div>
  );
};

export default Layout;
