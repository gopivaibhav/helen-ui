import AppointmentButton from "./AppointmentButton";
import TimingButton from "./TimingButton";
const VirtualSession = ({therapistInfo}) => {
    return (
        <>
            <div className="heading-appointment" style={{ width: "100%", display: "flex", marginBottom: "10px" }}>
                <h3 style={{ width: "70%", marginBottom: "15px" }}>Virtual Appointment</h3>
                <h3 style={{ width: "30%", textAlign: "center" }}>INR {therapistInfo.pricePerSession}</h3>
            </div>
            <div className="outer-container" style={{ width: "100%", overflowX: "auto", display: "flex",marginBottom:"35px" }}>
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
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
            <button style={{width:"85%",height:"50px",alignSelf:"center",border:"none",background:"#758BFF",color:"white",borderRadius:"15px",fontWeight:"600",fontSize:"16px"}}>BOOK SESSION</button>
            </div>
        </>
    );
}

export default VirtualSession;
