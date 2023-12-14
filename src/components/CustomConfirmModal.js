import React from 'react';

const CustomConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal"
    style={{
        width:"auto",
        height:"6.25rem",
        boxShadow:"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        display:"inline-block",
        top:"50%",
        left:"50%",
        position:"absolute",
        transform:" translate(-50%, -50%)",
        zIndex:"1000",
        backgroundColor:"#FF7777",
        color:"#FFFFFF",
        fontWeight:"bolder",
        padding:"20px",
        borderRadius:"0.375rem"
      }}
    >

      <p
      style={{
        "marginTop":"5px"
      }}
      >{message}</p>
      <div
      style={{
        "display":"flex",
        "justifyContent":"space-around",
        "marginTop":"10px"
      }}
      >
      <button onClick={onConfirm}
      style={{
        "padding":"5px",
        "backgroundColor":"#FFFFFF",
        "border":"1px solid #FFFFFF",
        "borderRadius":"0.375rem",
        "cursor":"pointer",
      }}
      >Yes</button>
      <button onClick={onCancel}
         style={{
          "padding":"5px",
          "backgroundColor":"#FFFFFF",
          "border":"1px solid #FFFFFF",
          "borderRadius":"0.375rem",
          "cursor":"pointer",
        }}
      >No</button>
      </div>
    </div>
  );
};

export default CustomConfirmModal;
