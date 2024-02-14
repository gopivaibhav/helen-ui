import React, { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Helen from "../components/Helen";
import { useLocation, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import NewLoader from "./NewLoader";
import SessionRating from "./SessionRating";
import CompanianAi from "../components/CompanionAi";
import Microphone from "./microphone";

const NewLayout = () => {
  const [isActive, setIsActive] = useState(false);
  // const [showRatingModal, setshowRatingModal] = useState(true);
  const [topic, setTopic] = useState("");
  const [progress, setProgress] = useState(4.5);
  const params = useParams();
  const location = useLocation();
  const [loader, setLoader] = useState(true);
  return (
    <>
      {loader ? (
        <NewLoader setLoader={setLoader} />
      ) : (
        <div className="App">
          <Header
            setIsActive={setIsActive}
            progress={progress}
            // showRatingModal={showRatingModal}
            // setshowRatingModal={setshowRatingModal}
          />
          {
            location.pathname === "/helen-therapy" ? (
              <Helen
                setProgress={setProgress}
                // showRatingModal={showRatingModal}
                // setshowRatingModal={setshowRatingModal}
              />
            ): (
              <Microphone 
                setProgress={setProgress}
              />
            )
          }
        </div>
      )}
      {/* <SessionRating /> */}
    </>
  );
};

export default NewLayout;
