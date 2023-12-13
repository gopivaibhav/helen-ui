import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Helen from "../components/Helen";

const Layout = () => {
  return (
    <div className="App">
      <Header />
      <Helen />
      {/* {isActive === true ? (
        <Helen topic = {topic}/>
      ) : (
        <Menu setTopic = {setTopic} setIsActive={setIsActive} />
      )} */}
    </div>
  );
};

export default Layout;
