import React from 'react';

const DisclaimerPopup = ({ message, setDisclaimer, showDisclaimer }) => {
  return (
    <div className={`custom-confirm-modal ${showDisclaimer ? 'show' : ''}`}>
      <div className="modal-overlay" />
      <div className="modal-content">
        <p>{message}</p>
        <div className="button-container">
          <button onClick={() => {setDisclaimer(false)}} style={{ backgroundColor: 'rgba(117, 139, 255, 1)' }}>I agree</button>
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
          max-width: 300px;
          background-color: #fff;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
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

export default DisclaimerPopup;
