import React, { useEffect, useRef, useState } from "react";

const DisclaimerModal = ({ onConfirm, onCancel, showModal, setShowModal }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showModal, setShowModal]);
  return (
    <div className={`custom-confirm-modal ${showModal ? "show" : ""}`}>
      <div className="modal-overlay" />
      <div
        ref={popupRef}
        className="modal-content"
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "justify",
        }}
      >
        <div
          style={{
            marginBottom: "10px",
            width: "80%",
            height: "100%",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "black",
              fontSize: "18px",
              fontFamily: "Nunito Sans",
              fontWeight: "800",
              margin: "40px 0px 10px 0",
              wordWrap: "break-word",
            }}
          >
            Disclaimer
          </div>
          <span
            style={{
              color: "#4E4D4D",
              fontSize: 13,
              fontFamily: "Nunito Sans",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
          >
            Welcome to Helen AI. Please be aware that this app is an AI-powered
            tool designed to offer support and general information about
            cognitive behavioral therapy. It is not a replacement for
            professional medical advice, diagnosis, or treatment. Always consult
            with a qualified healthcare professional for any medical concerns.
            <br />
            <br />
            This app is not equipped to handle emergencies or acute mental
            health crises. In the event of an emergency, immediately contact
            your local emergency services. Use of this app is at your own risk
            and discretion. For information on how we handle your data, please
            review our{" "}
          </span>
          <a
            href="https://use.tryhelen.com/privacy"
            style={{
              color: "#4859EC",
              fontSize: 13,
              fontFamily: "Nunito Sans",
              fontWeight: "600",
              wordWrap: "break-word",
              textDecoration: "none",
            }}
          >
            privacy policy
          </a>
          <span
            style={{
              color: "#4E4D4D",
              fontSize: 13,
              fontFamily: "Nunito Sans",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
          >
            .
          </span>
          <div className="button-container">
            <button
              onClick={onConfirm}
              style={{
                backgroundColor: "rgba(117, 139, 255, 1)",
                width: "100%",
                marginTop: "10px",
              }}
            >
              I understand
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-confirm-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
        }

        .modal-content {
          width: auto;
          max-width: 350px;
          background-color: #fff;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -4px rgba(0, 0, 0, 0.1);
          border-radius: 20px;
          overflow: hidden;
          z-index: 1;
        }

        .modal-content p {
          margin: 15px 20px;
          font-weight: bold;
          font-size: 16px;
        }

        .button-container {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
        }

        .custom-confirm-modal button {
          padding: 10px;
          background-color: rgba(117, 139, 255, 1);
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .custom-confirm-modal button:hover {
          background-color: #ff5555;
        }

        .show {
          display: flex;
        }
      `}</style>
    </div>
  );
};

export default DisclaimerModal;
