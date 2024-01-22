import React, {  useEffect } from "react";

const TherapistDataNavBar = ({selection,setSelection}) => {
    return (
        <>
            <div className="bg-therapist-navabar" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", margin: "4vh 0" }}>
                <div className="therapistDataNavbar" style={{
                    width: "70%",
                    borderRadius: "9px",
                    height: "40px",
                    backgroundColor: "#7676801F",
                    padding: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"

                }}>
                    <button
                        style={{
                            width: "44%",
                            height: "100%",
                            border: 0,
                            backgroundColor: selection === 1 ? "white" : "rgba(255, 0, 0, 0)", // Fix the syntax here
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "400",
                            boxShadow: selection === 1 ? "0px 4px 4px rgba(0, 0, 0, 0.25)": "none"
                        }}
                        onClick={() => setSelection(1)}
                    >
                        Full Profile
                    </button>

                    <img src="/vertical.svg" alt="" style={{ height: "90%", borderWidth: "6px", margin: "0 5%" }} />
                    <button
                        style={{
                            width: "44%",
                            height: "100%",
                            border: 0,
                            backgroundColor: selection === 2 ? "white" : "rgba(255, 0, 0, 0)", // Set the background color based on the condition
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "400",
                            boxShadow: selection === 2 ? "0px 4px 4px rgba(0, 0, 0, 0.25)": "none"
                        }}
                        onClick={() => setSelection(2)}
                    >
                        Book appointment
                    </button>
                </div>
            </div>
        </>
    );
}

export default TherapistDataNavBar;
