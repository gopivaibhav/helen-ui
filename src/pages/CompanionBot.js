import React, { useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Helen from "../components/Helen";
import { useLocation, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import NewLoader from "./NewLoader";
import SessionRating from "./SessionRating";
import CompanianAi from "../components/CompanionAi";
import CompanionHeader from "../components/CompanionHeader";

const CompanionBot = () => {
  const [isActive, setIsActive] = useState(false);
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
          <CompanionHeader
            setIsActive={setIsActive}
            progress={progress}
            // showRatingModal={showRatingModal}
            // setshowRatingModal={setshowRatingModal}
          />
          {/* <Helen
            setProgress={setProgress}
            // showRatingModal={showRatingModal}
            // setshowRatingModal={setshowRatingModal}
          /> */}
          <CompanianAi setProgress={setProgress} />
        </div>
      )}
      {/* <SessionRating /> */}
    </>
  );
};

export default CompanionBot;
