import React from "react";
import '../styles/Companion.css'

function Companion() {
  return (
    <>
      <div
        style={{
          background: "rgba(117, 139, 255, 1)",
          width: "100%",
          height: "220px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0",
            margin: "1rem",
            top: "75px",
            marginBottom: "45px",
            marginTop: "22px",
            marginLeft: "9.3vw",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "40px",
              fontFamily: "'Nunito Sans', sans-serif ",
              fontWeight: "800",
              lineHeight: "40px",
              wordWrap: "break-word",
            }}
          >
            Create a companion
          </h1>
          <p
            style={{
              color: "white",
              fontSize: "20px",
              fontFamily: "'Nunito Sans', sans-serif ",
              fontWeight: "400",
              lineHeight: "40px",
              wordWrap: "break-word",
            }}
          >
            Use it to set good habits, break bad ones, or simply vent after a
            long day.
          </p>
        </div>
      </div>
      <form id="companion-form"
        style={{
          margin: "0 auto",
          maxWidth: "500px",
          background: "white",
          padding: "40px",
          paddingLeft: "30px",
          height: "60vh",
          fontFamily: "'Nunito Sans', sans-serif ",
        }}
      >
        <div style={{ marginBottom: "35px" }}>
          <label htmlFor="name" style={{ fontWeight: "500" }}>
            Your name
          </label>
          <br></br>
          <input
            type="text"
            id="name"
            placeholder="What should your companion call you?"
            style={{
              fontSize: "0.8rem",
              width: "85%",
              marginTop: "15px",
              padding: "8px",
              borderRadius: "6px",
              border: "0",
              outline: "none"
            }}
          />
        </div>
        <div style={{ marginBottom: "35px" }}>
          <label htmlFor="name" style={{ fontWeight: "500" }}>
            Companion name
          </label>
          <br></br>
          <input
            type="text"
            id="name"
            placeholder="What do you want to call your companion?"
            style={{
              width: "85%",
              fontSize: "0.8rem",
              marginTop: "15px",
              padding: "8px",
              borderRadius: "6px",
              border: "none",
              outline: "none"
            }}
          />
        </div>
        <div style={{ marginBottom: "35px" }}>
          <label htmlFor="name" style={{ fontWeight: "500" }}>
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
              width: "85%",
              marginTop: "15px",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              outline: "none"
            }}
          />
        </div>
        <div style={{ marginBottom: "35px" }}>
          <label htmlFor="name" style={{ fontWeight: "500" }}>
            Companion voice
          </label>
          <br></br>
          <select
            id="role"
            style={{
              fontWeight: "550",
              color: "gray",
              fontSize: "0.8rem",
              width: "85%",
              marginTop: "15px",
              padding: "8px",
              borderRadius: "6px",
              border: "none",
              outline: "none"
            }}
          >
            <option value="" disabled selected hidden>
              Choose a voice for your companion
            </option>
            <option value="voice_1">Voice 1</option>
            <option value="voice_2">Voice 2</option>
            <option value="voice_3">Voice 3</option>
          </select>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              background: "rgba(117, 139, 255, 1)",
              color: "white",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              width: "80%",
              border: "none",
              fontWeight: "500",
              marginTop: "15px",
            }}
          >
            CREATE
          </button>
        </div>
      </form>
    </>
  );
}

export default Companion;
