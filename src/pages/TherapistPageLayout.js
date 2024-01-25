import HeaderMP from "../components/Marketplace/HeaderMP";
import TherapistDataCard from "../components/TherapistDataCard";
import TherapistDataNavBar from "../components/TherapistDataNavBar";
import Profile from "../components/ProfileTherapist";
import BookAppointment from "../components/BookAppointment";
import FooterMP from "../components/Marketplace/FooterMP";
import { useState } from "react";
const TherapistPageLayout = () => {
    const [selection, setSelection] = useState(1);
    return (
        <>
            <div
                style={{
                    margin: "1% 4%",
                    height: "100%"
                }}
            >
                <HeaderMP BackUrl={"marketplace"} PageName={"All therapists"} />
                <div
                    style={{
                        width: "100%",
                        height: "25%",
                    }}
                >
                    <TherapistDataCard />
                    <TherapistDataNavBar selection={selection} setSelection={setSelection} />
                    {selection === 1 ? <Profile /> : <BookAppointment />}
                </div>
            </div>
            <div className="space" style={{height:"100px",width:"1005"}}></div>
            <FooterMP />

        </>
    );
}

export default TherapistPageLayout;