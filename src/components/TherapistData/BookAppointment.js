import { useState } from 'react';
import InPersonSession from './InPersonSession';
import VirtualSession from './VirtualSession';

const BookAppointment = () => {
    const [selection, setSelection] = useState(1);
    const handleClick = (e) => {
        if (e.target.id === "virtual-session") {
            setSelection(1);
        } else {
            setSelection(2);
        }
    }
    return (
        <>
            <h3 style={{
                marginBottom: "10px"
            }}>Select session type</h3>
            <div className="session-type" style={{
                width: "100%",
                marginBottom: "30px"
            }}>
                <button id="virtual-session" onClick={handleClick} style={{
                    padding: "25px",
                    width: "45%",
                    marginRight: "10px",
                    borderRadius: "10px",
                    color: selection === 1 ? "white" : "black",
                    backgroundColor: selection === 1 ? "#758BFF" : "white",
                    border: "1px solid #E4E4E7",
                }}>Virtual session</button>
                <button id="in-person-session" onClick={handleClick} style={{
                    padding: "25px",
                    marginRight: "10px",
                    width: "45%",
                    borderRadius: "10px",
                    color: selection === 2 ? "white" : "black",
                    backgroundColor: selection === 2 ? "#758BFF" : "white",
                    border: "1px solid #E4E4E7",
                }}>In-person session</button>
            </div>
            {selection === 1 ? <VirtualSession /> : <InPersonSession />}
        </>
    );
}

export default BookAppointment; 