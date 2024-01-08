import React from "react";
import "../styles/Companion.css";

function Companion() {
  const handleSubmit = () => {
    sessionStorage.setItem("companion_role", "guitar tutor");
    sessionStorage.setItem("companion", "Kapil");
    sessionStorage.setItem("voice_artist", "alloy");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "'Nunito Sans', sans-serif ",
      }}
      className="form-companion"
    >
      <div
        style={{
          background: "rgba(117, 139, 255, 1)",
          width: "100%",
          height: "29vh",
          lineBreak: "auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0",
            margin: "1rem",
            top: "60px",
            marginBottom: "45px",
            marginTop: "0px",
            marginLeft: "9.3vw",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "2.5rem",
              lineHeight: "2.5rem",
              wordWrap: "break-word",
              marginBottom: "1.75rem",
              width: "100%",
              letterSpacing: "1px",
            }}
          >
            Create a companion
          </h1>
          <p
            style={{
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: "400",
              wordWrap: "break-word",
              width: "80%",
              lineHeight: "1.75rem",
            }}
          >
            Use it to set good habits, break bad ones, or simply vent after a
            long day.
          </p>
        </div>
      </div>
      <form
        id="companion-form"
        style={{
          margin: "0 auto",
          maxWidth: "650px",
          width: "100%",
          background: "white",
          padding: "40px",
          paddingLeft: "30px",
          height: "60vh",
        }}
      >
        <div style={{ marginBottom: "35px" }}>
          <label
            htmlFor="name"
            style={{
              fontWeight: "500",
              letterSpacing: "0.03em",
              color: "black",
            }}
          >
            Your name
          </label>
          <br></br>
          <input
            type="text"
            id="name"
            placeholder="What should your companion call you?"
            style={{
              fontSize: "0.8rem",
              width: "87%",
              marginTop: "15px",
              padding: "10px",
              borderRadius: "6px",
              border: "0",
              outline: "none",
            }}
          />
        </div>
        <div style={{ marginBottom: "35px" }}>
          <label
            htmlFor="name"
            style={{
              fontWeight: "500",
              letterSpacing: "0.03em",
              color: "black",
            }}
          >
            Companion name
          </label>
          <br></br>
          <input
            type="text"
            id="name"
            placeholder="What do you want to call your companion?"
            style={{
              width: "87%",
              fontSize: "0.8rem",
              marginTop: "15px",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              outline: "none",
            }}
          />
        </div>
        <div style={{ marginBottom: "35px" }}>
          <label
            htmlFor="name"
            style={{
              fontWeight: "500",
              letterSpacing: "0.03em",
              color: "black",
            }}
          >
            Define your companion's role
          </label>
          <br></br>
          <textarea
            id="name"
            placeholder='Example: "You are an assistant who encourages me to focus on a work-life balance and helps me quit smoking"'
            style={{
              height: "70px",
              resize: "none",
              fontSize: "0.8rem",
              width: "87%",
              marginTop: "15px",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              outline: "none",
            }}
          />
        </div>
        <div style={{ marginBottom: "35px" }}>
          <label
            htmlFor="name"
            style={{
              fontWeight: "500",
              letterSpacing: "0.03em",
              color: "black",
            }}
          >
            Companion voice
          </label>
          <br></br>
          <select
            id="role"
            style={{
              fontWeight: "400",
              fontSize: "0.8rem",
              width: "87%",
              marginTop: "15px",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              outline: "none",
            }}
          >
            <option value="" disabled selected hidden>
              Choose a voice for your companion
            </option>
            <option value="Alloy">Voice 1</option>
            <option value="voice_2">Voice 2</option>
            <option value="voice_3">Voice 3</option>
          </select>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            className="companionsubmit"
            style={{
              background: "rgba(117, 139, 255, 1)",
              color: "white",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              width: "80%",
              border: "none",
              fontWeight: "800",
            }}
            onClick={handleSubmit}
          >
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
}

export default Companion;
