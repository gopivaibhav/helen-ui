import React from "react";
import { useNavigate } from "react-router-dom";


const DoctorList = () => {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate("./:id")
  }
  return (
    <>
      <div
        className="FeatureCardWrapper"
        style={{
          width: "calc(100% - 6.3vw)",
          borderRadius: "16",
          display: "block",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            marginBottom: "5px",
          }}
        >
          <div
            style={{
              width: "30%",
              background: "",
            }}
          >
            <img
              src="/doctor.png"
              alt=""
              style={{
                borderRadius: "50%",
                objectFit: "contain",
                width: "80%",
              }}
            />
          </div>
          <div
            style={{
              width: "70%",
              background: "",
              color: "#18181B",
              display: "flex",
              alignItems: "center",
              paddingLeft: "5px",
            }}
          >
            <div>
              <div
                style={{
                  //
                  color: "#18181B",
                  fontSize: 16,
                  fontFamily: "Nunito Sans",
                  fontWeight: "800",
                  lineHeight: "16px",
                  wordWrap: "break-word",
                }}
              >
                Hero Doctor
              </div>
              <div
                style={{
                  width: "100", // 3+ years of experience
                  color: "#758BFF",
                  fontSize: 14,
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                  lineHeight: "16px",
                  wordWrap: "break-word",
                }}
              >
                3+ years of experience
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "block" }}>
          <div style={{ display: "flex", margin: "0px .6rem" }}>
            <div style={{ marginRight: ".5rem", width: "20px" }}>
              <img alt="" src="./lang-icon.svg" />
            </div>
            <div
              style={{
                // Speaks Hindi, English, and Malayalam
                color: "#71717A",
                fontSize: 12,
                fontFamily: "Nunito Sans",
                fontWeight: "600",
                lineHeight: "16px",
                wordWrap: "break-word",
              }}
            >
              Speaks Hindi, English, and Malayalam
            </div>
          </div>
          <div style={{ display: "flex", margin: "0px .6rem" }}>
            <div style={{ marginRight: ".5rem", width: "20px" }}>
              <img
                alt=""
                src="./rupee-icon.svg"
                style={{ marginLeft: "2px" }}
              />
            </div>
            <div
              style={{
                color: "#71717A",
                fontSize: 12,
                fontFamily: "Nunito Sans",
                fontWeight: "600",
                lineHeight: "16px",
                wordWrap: "break-word",
              }}
            >
              Starts at INR 1500/ session
            </div>
          </div>
          <div style={{ display: "flex", margin: "0px .6rem" }}>
            <div style={{ marginRight: ".5rem", width: "20px" }}>
              <img alt="" src="./meeting-icon.svg" />
            </div>
            <div
              style={{
                color: "#71717A",
                fontSize: 12,
                fontFamily: "Nunito Sans",
                fontWeight: "600",
                lineHeight: "16px",
                wordWrap: "break-word",
              }}
            >
              Virtual and In-Person (
              <span style={{ fontWeight: 800 }}>Delhi</span>)
            </div>
          </div>
          <div
            style={{
              display: "flex",
              margin: "10px .6rem",
              // Available tomorrow at 8:
              color: "#758BFF",
              fontSize: 14,
              fontFamily: "Nunito Sans",
              fontWeight: "700",
              lineHeight: "16px",
              letterSpacing: 0.1,
              wordWrap: "break-word",
            }}
          >
            Available tomorrow at 8:00 pm
          </div>
          <div
            style={{
              display: "flex",
              margin: "10px .6rem",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingLeft: 33,
                paddingRight: 33,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 5,
                overflow: "hidden",
                border: "1px #E4E4E7 solid",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
                marginRight: "5px",
                marginTop: "15px"
              }}
            >
              <div
                style={{
                  color: "#6C6C70",
                  fontSize: 16,
                  fontFamily: "Nunito Sans",
                  fontWeight: "700",
                  lineHeight: "16px",
                  wordWrap: "break-word",
                }}
              >
                Profile
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 47,
                paddingRight: 53,
                background: "#758BFF",
                borderRadius: 5,
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
                display: "inline-flex",
                marginLeft: "5px",
                marginTop: "15px"
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Nunito Sans",
                  fontWeight: "700",
                  lineHeight: "16px",
                  wordWrap: "break-word",
                }}
                onClick={handleClick}
              >
                Book
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="FeatureCardWrapper"
        style={{
          width: "calc(100% - 6.3vw)",
          borderRadius: "16",
          display: "block",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            marginBottom: "5px",
          }}
        >
          <div
            style={{
              width: "30%",
              background: "",
            }}
          >
            <img
              src="/doctor.png"
              alt=""
              style={{
                borderRadius: "50%",
                objectFit: "contain",
                width: "80%",
              }}
            />
          </div>
          <div
            style={{
              width: "70%",
              background: "",
              color: "#18181B",
              display: "flex",
              alignItems: "center",
              paddingLeft: "5px",
            }}
          >
            <div>
              <div
                style={{
                  //
                  color: "#18181B",
                  fontSize: 16,
                  fontFamily: "Nunito Sans",
                  fontWeight: "800",
                  lineHeight: "16px",
                  wordWrap: "break-word",
                }}
              >
                Hero Doctor
              </div>
              <div
                style={{
                  width: "100", // 3+ years of experience
                  color: "#758BFF",
                  fontSize: 14,
                  fontFamily: "Nunito Sans",
                  fontWeight: "600",
                  lineHeight: "16px",
                  wordWrap: "break-word",
                }}
              >
                3+ years of experience
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "block" }}>
          <div style={{ display: "flex", margin: "0px .6rem" }}>
            <div style={{ marginRight: ".5rem", width: "20px" }}>
              <img alt="" src="./lang-icon.svg" />
            </div>
            <div
              style={{
                // Speaks Hindi, English, and Malayalam
                color: "#71717A",
                fontSize: 12,
                fontFamily: "Nunito Sans",
                fontWeight: "600",
                lineHeight: "16px",
                wordWrap: "break-word",
              }}
            >
              Speaks Hindi, English, and Malayalam
            </div>
          </div>
          <div style={{ display: "flex", margin: "0px .6rem" }}>
            <div style={{ marginRight: ".5rem", width: "20px" }}>
              <img
                alt=""
                src="./rupee-icon.svg"
                style={{ marginLeft: "2px" }}
              />
            </div>
            <div
              style={{
                color: "#71717A",
                fontSize: 12,
                fontFamily: "Nunito Sans",
                fontWeight: "600",
                lineHeight: "16px",
                wordWrap: "break-word",
              }}
            >
              Starts at INR 1500/ session
            </div>
          </div>
          <div style={{ display: "flex", margin: "0px .6rem" }}>
            <div style={{ marginRight: ".5rem", width: "20px" }}>
              <img alt="" src="./meeting-icon.svg" />
            </div>
            <div
              style={{
                color: "#71717A",
                fontSize: 12,
                fontFamily: "Nunito Sans",
                fontWeight: "600",
                lineHeight: "16px",
                wordWrap: "break-word",
              }}
            >
              Virtual and In-Person (
              <span style={{ fontWeight: 800 }}>Delhi</span>)
            </div>
          </div>
          <div
            style={{
              display: "flex",
              margin: "10px .6rem",
              // Available tomorrow at 8:
              color: "#758BFF",
              fontSize: 14,
              fontFamily: "Nunito Sans",
              fontWeight: "700",
              lineHeight: "16px",
              letterSpacing: 0.1,
              wordWrap: "break-word",
            }}
          >
            Available tomorrow at 8:00 pm
          </div>
          <div
            style={{
              display: "flex",
              margin: "10px .6rem",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingLeft: 33,
                paddingRight: 33,
                paddingTop: 10,
                paddingBottom: 10,
                borderRadius: 5,
                overflow: "hidden",
                border: "1px #E4E4E7 solid",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
                marginRight: "5px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  color: "#6C6C70",
                  fontSize: 16,
                  fontFamily: "Nunito Sans",
                  fontWeight: "700",
                  lineHeight: "16px",
                  wordWrap: "break-word",
                }}
              >
                Profile
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 47,
                paddingRight: 53,
                background: "#758BFF",
                borderRadius: 5,
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
                display: "inline-flex",
                marginLeft: "5px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 16,
                  fontFamily: "Nunito Sans",
                  fontWeight: "700",
                  lineHeight: "16px",
                  wordWrap: "break-word",
                }}
              >
                Book
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
