import { grey } from "@mui/material/colors";

const TherapistDataCard = () => {
    return (
        <>
            <div className="therapist-data-card" style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                height: "50%",
                alignItems: "center",
                marginBottom: "10%",
                marginTop: "5%",    
            }}>
                <img src='/doctor.png' alt="" style={{ backgroundColor: grey, width: "100px", height: "100px", borderRadius: "50%" }} />
                <div className="data-block" style={{ width: "60%", height: "100%", padding: "0 10%", display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
                    <h1 style={{ fontSize: "1.25rem", width: "100%", marginBottom: "7px" }}>Hero Doctor</h1>
                    <p style={{ fontSize: "1rem", color: "#758bff", width: "100%" }}>Clinical psychologist</p>
                </div>
            </div>
            <div className="details" style={{ width: "100%", height: "30%", display: "flex", flexDirection: "row" ,alignItems:"center",justifyContent:"center"}}>
                <div className="block" style={{ width: "32%", display: "flex", justifyContent: "center", flexDirection: "column",marginLeft:"15px"}}>
                    <div className="row1" style={{ display: "flex", marginBottom: "7px",alignItems:"center" }}  >
                        <img src="/rating.svg" style={{ display: "inline-block", width: "20px", height: "20px" }} />
                        <h3 style={{ fontSize: "20px", fontFamily: "lexend", fontWeight: "400", marginLeft: "10px", width: "fit-content" }}>4.3</h3>
                    </div>
                    <p style={{ fontSize: "15px", fontWeight: "400", color: "#a1a8b0" }}>Rating & Review</p>
                </div>
                <img src="/vertical.svg" alt="" style={{border: "1px"}}/>
                <div className="block" style={{ width: "28%", display: "flex", justifyContent: "center", flexDirection: "column", marginLeft: "15px" }}>
                    <div className="row1" style={{ display: "flex", marginBottom: "7px", alignItems:"center" }}  >
                        <img src="/Briefcase.svg" style={{ display: "inline-block", width: "20px", height: "20px" }} />
                        <h3 style={{ fontSize: "20px", fontFamily: "lexend", fontWeight: "400", marginLeft: "10px", width: "fit-content" }}>14 yrs</h3>
                    </div>
                    <p style={{ fontSize: "15px", fontWeight: "400", color: "#a1a8b0" }}>Experience</p>
                </div>
                <img src="/vertical.svg" alt="" style={{border: "1px"}}/>
                <div className="block" style={{ width: "30%", display: "flex", justifyContent: "center", flexDirection: "column", marginLeft: "15px" }}>
                    <div className="row1" style={{ display: "flex", marginBottom: "7px",alignItems:"center" }}  >
                        <img src="/Vector.svg" style={{ display: "inline-block", width: "18px", height: "18px" }} />
                        <h3 style={{ fontSize: "20px", fontFamily: "lexend", fontWeight: "400", marginLeft: "10px", width: "fit-content" }}>1000</h3>
                    </div>
                    <p style={{ fontSize: "15px", fontWeight: "400", color: "#a1a8b0" }}>per session</p>
                </div>
            </div>
        </>

    );
}

export default TherapistDataCard;