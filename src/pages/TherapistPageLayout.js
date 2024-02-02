import HeaderMP from "../components/Marketplace/HeaderMP";
import TherapistDataCard from "../components/TherapistData/TherapistDataCard";
import TherapistDataNavBar from "../components/TherapistData/TherapistDataNavBar";
import Profile from "../components/ProfileTherapist";
import BookAppointment from "../components/TherapistData/BookAppointment";
import FooterMP from "../components/Marketplace/FooterMP";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const TherapistPageLayout = () => {
  const location = useLocation();
  const isProfile = location.state.isProfile;
  const id = location.state.id;
  console.log("id >>>>>", id);
  const [selection, setSelection] = useState(
    isProfile !== undefined ? isProfile : 1
  );
  const [therapistInfo, setTherapistInfo] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/marketplace/get/${id}`
        );
        setTherapistInfo(res.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, [id]);
  console.log(therapistInfo);
  return (
    <>
      <div
        style={{
          margin: "1% 4%",
          height: "100%",
          maxWidth: "600px",
        }}
      >
        <HeaderMP BackUrl={"marketplace"} PageName={"All therapists"} />
        <div
          style={{
            width: "100%",
            height: "25%",
          }}
        >
          <TherapistDataCard therapistInfo={therapistInfo} />
          <TherapistDataNavBar
            selection={selection}
            setSelection={setSelection}
          />
          {selection === 1 ? (
            <Profile therapistInfo={therapistInfo} />
          ) : (
            <BookAppointment therapistInfo={therapistInfo} />
          )}
        </div>
      </div>
      <div className="space" style={{ height: "100px", width: "100%" }}></div>
      <FooterMP />
    </>
  );
};

export default TherapistPageLayout;
