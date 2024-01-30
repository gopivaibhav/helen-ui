const AppointmentButton = () => {
    return (<button style={{
        width:"45%",
        padding:"10px",
        minWidth:"45%",
        margin:"0 5px",
        backgroundColor:"white",
        border:"1px solid #E4E4E7", 
        borderRadius:"10px"
    }}>
     <p style={{textAlign:"left",fontWeight:"300",fontFamily:"Nunito sans",marginBottom:"10px"}}>Monday</p>
     <h4 style={{textAlign:"left",fontWeight:"700",fontSize:"16px",fontFamily:"Nunito sans"}}>Today (No slots)</h4>
    </button>);
}

export default AppointmentButton;