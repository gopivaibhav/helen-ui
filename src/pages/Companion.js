import React, { useState } from "react";
import "../styles/Companion.css";
import CustomConfirmModal from "../components/CustomConfirmModal";
import axios from "axios";
import DisclaimerModal from "../components/DisclaimerModal";

function Companion() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    yourName: "",
    companionName: "",
    companionRole: "",
    companionVoice: "",
    userId: sessionStorage.userId,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Store data in sessionStorage
    sessionStorage.setItem("companion_role", formData.companionRole);
    sessionStorage.setItem("companion", formData.companionName);
    sessionStorage.setItem("voice_artist", formData.companionVoice);
    sessionStorage.setItem("yourName", formData.yourName);
    const data = await axios.post(
      `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/companion/create/`,
      formData
    );
    // Console log the form values
    console.log("Form Data:", formData);
    setShowModal(true);
  };
  const handleConfirm = async () => {
    // setShowModal(false);
    // setLoading(true);
    // const data = await axios.get(
    //   `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/session/get/${sessionStorage.getItem(
    //     "ongoingSession"
    //   )}`
    // );
    // setLoading(false);
    navigateToHome();
  };
  const navigateToHome = () => {
    setShowModal(false);
    window.location.href = "/";
  };
  const handleCancel = () => {
    navigateToHome();
  };
  return (
    <>
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
          onSubmit={handleSubmit}
        >
          <div style={{ marginBottom: "35px" }}>
            <label
              htmlFor="yourName"
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
              id="yourName"
              name="yourName"
              value={formData.yourName}
              onChange={handleChange}
              required
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
              htmlFor="companionName"
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
              id="companionName"
              name="companionName"
              value={formData.companionName}
              onChange={handleChange}
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
              required
            />
          </div>
          <div style={{ marginBottom: "35px" }}>
            <label
              htmlFor="companionRole"
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
              id="companionRole"
              name="companionRole"
              value={formData.companionRole}
              onChange={handleChange}
              required
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
              htmlFor="companionVoice"
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
              id="companionVoice"
              name="companionVoice"
              value={formData.companionVoice}
              onChange={handleChange}
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
              required
            >
              <option value="" disabled selected hidden>
                Choose a voice for your companion
              </option>
              <option value="alloy">Voice 1</option>
              <option value="echo">Voice 2</option>
              <option value="fable">Voice 3</option>
              <option value="onyx">Voice 4</option>
              <option value="nova">Voice 5</option>
              <option value="shimmer">Voice 6</option>
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
            >
              CREATE
            </button>
          </div>
        </form>
      </div>
      {showModal && (
        <CustomConfirmModal
          message={`Do you want to talk ${formData.companionName} right now?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}

export default Companion;
