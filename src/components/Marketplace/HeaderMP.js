import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
const HeaderMP = ({ BackUrl, PageName }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        marginRight: "0.5rem",
        marginTop: "1rem",
        marginBottom: "1.5rem",
        alignItems: "center",
      }}
    >
      <button
        style={{
          cursor: "pointer",
          outline: "none",
          border: "none",
          // border: "2px solid rgba(117, 139, 255, 1)", // Added border property with a solid red color
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          color: "rgba(117, 139, 255, 1)",
          padding: "0.2rem 0px",
          marginRight: "10px",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "700 !important",
          fontFamily: "'Nunito Sans', sans-serif ",
        }}
        onClick={() => {
          navigate(`/${BackUrl}`);
        }}
      >
        <ChevronLeftIcon sx={{}} />
      </button>
      <div
        style={{
          color: "#374151",
          fontSize: 16,
          fontFamily: "Nunito Sans",
          fontWeight: "700",
          lineHeight: "25.60px",
          wordWrap: "break-word",
        }}
      >
        {PageName}
      </div>
    </div>
  );
};

export default HeaderMP;
