import React from "react";

const FooterMP = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "90px",
        position: "fixed",
        bottom: "0",
        background: "white",
        boxShadow: "0px -10px 30px rgba(210.37, 210.37, 210.37, 0.20)",
      }}
    >
      {/* <div
        style={{
          width: "25px",
          height: "4px",
          left: "46%",
          top: 0,
          position: "absolute",
          background: "#758BFF",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      /> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <div>
          {/* <div
              style={{
                width: "25px",
                height: "4px",
                position: "relative",
                top: "-22.4px",
                background: "#758BFF",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                left: "0px"
              }}
            /> */}
            <img
              style={{ color: "rgba(151, 156, 158, 1)" }}
              src="./home-2.svg"
              alt=""
            />
            <div
              style={{
                textAlign: "center",
                color: "#979C9E",
                fontSize: "10px",
                fontFamily: "Nunito Sans",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              Home
            </div>
          </div>
        </div>{" "}
        <div
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <div style={{ textAlign: "center" , justifyContent:"center"}}>
            <div
              style={{
                width: "25px",
                height: "4px",
                position: "relative",
                top: "-22.4px",
                background: "#758BFF",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                left: "15px"
              }}
            />
            <img src="./therp.svg" alt="" />
            <div
              style={{
                textAlign: "center",
                color: "#758BFF",
                fontSize: "10px",
                fontFamily: "Nunito Sans",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              Therapists
            </div>
          </div>
        </div>{" "}
        <div
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <div>
          {/* <div
              style={{
                width: "25px",
                height: "4px",
                position: "relative",
                top: "-22.4px",
                background: "#758BFF",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                left: "0px"
              }}
            /> */}
            <img src="./profile-circle.svg" alt="" />
            <div
              style={{
                textAlign: "center",
                color: "#979C9E",
                fontSize: "10px",
                fontFamily: "Nunito Sans",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              Profile
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMP;
