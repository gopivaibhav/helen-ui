import AppointmentButton from "./AppointmentButton";
import TimingButton from "./TimingButton";
const InPersonSession = () => {
    return (
        <>
            <div className="heading-appointment" style={{ width: "100%", display: "flex", marginBottom: "10px" }}>
                <h3 style={{ width: "70%", marginBottom: "15px" }}>In-person Appointment</h3>
                <h3 style={{ width: "30%", textAlign: "center" }}>INR 1000</h3>
            </div>
            <div className="address" style={{ width: "100%", padding: "15px", background: "white", border: "1px solid #E4E4E7",borderRadius:"10px",marginBottom:"20px" }}>
                Address:
                No 150, Saket Rd, Block E, Saket, New Delhi, Delhi 110017
            </div>
            {/* <div className="outer-container" style={{ width: "100%", overflowX: "auto", display: "flex",marginBottom:"35px" }}>
                <div className="inner-container" style={{ width: "100%", display: "flex" }}>
                    <AppointmentButton />
                    <AppointmentButton />
                    <AppointmentButton />
                    <AppointmentButton />
                    <AppointmentButton />
                    <AppointmentButton />
                </div>
            </div>  
            <div className="timings" style={{marginBottom:"30px"}}>
                <TimingButton></TimingButton>
                <TimingButton></TimingButton>
                <TimingButton></TimingButton>
                <TimingButton></TimingButton>
                <TimingButton></TimingButton>
                <TimingButton></TimingButton>
                <TimingButton></TimingButton>
                <TimingButton></TimingButton>
            </div> */}

            <div style={{display:"flex",justifyContent:"center"}}>
            <button style={{width:"85%",height:"50px",alignSelf:"center",border:"none",background:"#758BFF",color:"white",borderRadius:"15px",fontWeight:"600",fontSize:"16px"}}>BOOK SESSION</button>
            </div>
        </>
    );
}

export default InPersonSession; 