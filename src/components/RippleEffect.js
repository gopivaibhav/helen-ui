import React, { useState } from "react";

const RippleEffect = ({ isPlaying }) => {
  // const [isPlaying, setIsPlaying] = useState(false);
  const [circleSize, setCircleSize] = useState(220);
  // useEffect(() => {
  //   if (isPlaying) {
  //     setCircleSize(() => 240);
  //   } else {
  //     setCircleSize(() => 220);
  //   }
  // }, [isPlaying]);
  return (
    <div
      className="ripple-container"
      style={{
        zIndex: -1,
        marginTop: "-10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "240px",
      }}
    >
      <div
        className="circle1"
        style={{
          width: isPlaying ? circleSize - 10 + "px" : circleSize - 45 + "px",
          height: isPlaying ? circleSize - 10 + "px" : circleSize - 45 + "px",
          backgroundColor: "rgb(117, 139, 255, 0.3)", // Color change
          borderRadius: "50%",
          position: "relative",
          transition: "all 0.3s ",
        }}
      >
        <div
          className="circle2"
          style={{
            width: isPlaying ? circleSize - 35 + "px" : circleSize - 45 + "px",
            height: isPlaying ? circleSize - 35 + "px" : circleSize - 45 + "px",
            backgroundColor: "rgb(117, 139, 255, 0.5)", // Color change
            borderRadius: "50%",
            transition: "all 0.3s ",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="circle3"
            style={{
              width: circleSize - 60 + "px",
              height: circleSize - 60 + "px",
              backgroundColor: "rgb(117, 139, 255, 0.8)",
              borderRadius: "50%",
              transition: "all 0.3s ",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {" "}
            <img
              style={{
                width: circleSize - 80 + "px",
                height: circleSize - 80 + "px",
                borderRadius: 9999,
                boxShadow: "0px 1px 30px rgba(0, 0, 0, 0.2)",
                zIndex: -2,
                position: "absolute",
                top: "50%",
                left: "50%",
                transition: "all 0.3s  ",
                transform: "translate(-50%, -50%)",
              }}
              src="/helen.jpeg"
              alt="helen"
            />
          </div>
        </div>
      </div>
      {/* <button onClick={()=> setIsPlaying((prev)=> !prev)}>
        Click me
      </button> */}
    </div>
  );
};

export default RippleEffect;
