import React, { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Helen from "../components/Helen";
import { useLocation, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import NewLoader from "./NewLoader";

const NewLayout = () => {
  const [isActive, setIsActive] = useState(false);
  const [topic, setTopic] = useState("");
  const [progress, setProgress] = useState(4.5);
  const params = useParams();
  const location = useLocation();
  const [loader, setLoader] = useState(true);
  return loader ? (
    <NewLoader setLoader={setLoader} />
  ) : (
    <div className="App">
      <Header
        setIsActive={setIsActive}
        progress={progress}
      />
      <Helen setProgress={setProgress} />
    </div>
  );
};

export default NewLayout;
