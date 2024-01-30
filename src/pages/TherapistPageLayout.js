import HeaderMP from "../components/Marketplace/HeaderMP";
import TherapistDataCard from "../components/TherapistData/TherapistDataCard";
import TherapistDataNavBar from "../components/TherapistData/TherapistDataNavBar";
import Profile from "../components/ProfileTherapist";
import BookAppointment from "../components/TherapistData/BookAppointment";
import FooterMP from "../components/Marketplace/FooterMP";
import { useState } from "react";
const TherapistPageLayout = () => {
    const [selection, setSelection] = useState(1);
    return (
        <>
                <div
                    style={{
                        margin: "1% 4%",
                        height: "100%",
                        maxWidth: "600px"
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
                <div className="space" style={{ height: "100px", width: "100%" }}></div>
                <FooterMP />

        </>
    );
}

export default TherapistPageLayout;