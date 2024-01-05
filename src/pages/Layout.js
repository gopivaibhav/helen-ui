import React, { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Helen from "../components/Helen";
import { useLocation, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const [topic, setTopic] = useState("");
  const [progress, setProgress] = useState(4.5);
  const params = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  return loading ? (
    <div
      className="loader"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <RingLoader color={"purple"} loading={true} size={150} />
    </div>
  ) : (
    <div className="App">
      <Header
        setIsActive={setIsActive}
        progress={progress}
        setLoading={setLoading}
      />
      <Helen setProgress={setProgress} />
    </div>
  );
};

export default Layout;
