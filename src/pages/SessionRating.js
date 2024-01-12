import "../styles/SessionRating.css";
import { useState } from "react";
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";

const SessionRating = () => {
    const [rating, setRating] = useState(4);
    const navigate = useNavigate();
    const handleSubmit = ()=>{
        console.log(rating);
        console.log(sessionStorage.getItem("ongoingSession"));
        // RISHAB- TODO: add session rating with the session ID
    }
    return (
        <div className="body">
            <div className="background">
                <h1 className="heading">Session feedback</h1>
                <p className="text">Please rate your experience below</p>
                <Rating
                    sx={{
                        marginTop: "30px",
                        width: "250px",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                    name="simple-controlled"
                    value={rating}
                    size="large"
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                    className="rating"
                />
                <div className="navigation">
                    <button className="submit-button" onSubmit={handleSubmit}>Submit feedback</button>
                    <p style={{ color: "grey", fontWeight: "400", fontSize: "14px", margin: "15px" }}>OR</p>
                    <button className="home" style={{fontWeight:"500"}} onClick={() => navigate("/")}>
                        <svg style={{margin:"5px"}}width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.27168 10.6668C5.64172 12.1045 6.9468 13.1668 8.5 13.1668C10.0532 13.1668 11.3583 12.1045 11.7283 10.6668M7.68141 1.30345L2.02949 5.69939C1.65168 5.99324 1.46278 6.14017 1.32669 6.32417C1.20614 6.48716 1.11633 6.67077 1.06169 6.866C1 7.08639 1 7.3257 1 7.80433V13.8334C1 14.7669 1 15.2336 1.18166 15.5901C1.34144 15.9037 1.59641 16.1587 1.91002 16.3185C2.26654 16.5001 2.73325 16.5001 3.66667 16.5001H13.3333C14.2668 16.5001 14.7335 16.5001 15.09 16.3185C15.4036 16.1587 15.6586 15.9037 15.8183 15.5901C16 15.2336 16 14.7669 16 13.8334V7.80433C16 7.3257 16 7.08639 15.9383 6.866C15.8837 6.67077 15.7939 6.48716 15.6733 6.32417C15.5372 6.14017 15.3483 5.99324 14.9705 5.69939L9.31859 1.30345C9.02582 1.07574 8.87943 0.961888 8.71779 0.918123C8.57516 0.879506 8.42484 0.879506 8.28221 0.918123C8.12057 0.961888 7.97418 1.07574 7.68141 1.30345Z" stroke="#9CA3AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SessionRating;
