import AppointmentButton from "./AppointmentButton";
import TimingButton from "./TimingButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
const VirtualSession = ({ therapistInfo }) => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState();
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (therapistInfo.slots !== undefined) {
      const isSlotAheadOfCurrentTime = (slot) => {
        const currentTimeIST = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });
        const currentDateIST = new Date(currentTimeIST);
        const slotDateTime = new Date(`${slot.slotDate} ${slot.startTime}`);
        return slotDateTime > currentDateIST;
      };
      const filteredSlots = therapistInfo.slots.filter((slot) =>
        isSlotAheadOfCurrentTime(slot)
      );

      const next7Days = Array.from({ length: 7 }, (_, index) => {
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + index);
        return nextDay.toISOString().split("T")[0];
      });

      const groupedSlots = Object.fromEntries(
        next7Days.map((date) => [
          date,
          {
            date,
            day: new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
            }), // Full day name
            slots: [],
          },
        ])
      );

      filteredSlots.forEach((slot) => {
        const slotDate = new Date(slot.slotDate);
        const key = slotDate.toISOString().split("T")[0];

        if (groupedSlots[key]) {
          groupedSlots[key].slots.push({
            startTime: slot.startTime,
            isAvailable: slot.isAvailable,
          });
        }
      });
      setSlots(() => groupedSlots);
    }
  }, [therapistInfo]);

  const AddTimings = () => {
    return (
      <div
        className="timings"
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {slots[selectedDate]?.slots.length > 0 ? (
          slots[selectedDate].slots.map((slot) => (
            <TimingButton
              key={slot.startTime}
              time={slot.startTime}
              setSelectedTime={setSelectedTime}
              selectedTime={selectedTime}
            />
          ))
        ) : (
          <button
            style={{
              width: "42%",
              padding: "14px",
              borderRadius: "15px",
              margin: "1.5%",
              background: "white",
              color: "black",
              border: "1px solid #E4E4E7",
            }}
          >
            No Slots Available
          </button>
        )}
      </div>
    );
  };
  const submitHandler = async () => {
    // console.log(JSON.parse(sessionStorage.getItem("userData")).email)
    if (sessionStorage.getItem("userData") === null) {
      loginWithRedirect();
    } else {
      console.log("Selected Date: ", selectedDate);
      console.log("Selected Time: ", selectedTime);
      const filteredSlot = therapistInfo.slots.filter(
        (i) => i.slotDate === selectedDate && i.startTime === selectedTime
      );
      console.log("Filtered Slot: ", filteredSlot);
      const slotId = filteredSlot[0].slotId;
      const bodyObj = {
        slot_id: slotId,
        therapistId: therapistInfo.therapistId,
        userId: JSON.parse(sessionStorage.getItem("userData")).email,
      };
      const response = await axios.post(
        "https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/marketplace/post/updateallslot",
        bodyObj
      );
      console.log(response.data);
    }
  };
  return (
    <>
      <div
        className="heading-appointment"
        style={{ width: "100%", display: "flex", marginBottom: "10px" }}
      >
        <h3 style={{ width: "70%", marginBottom: "15px" }}>
          Virtual Appointment
        </h3>
        <h3 style={{ width: "30%", textAlign: "center" }}>
          INR {therapistInfo.pricePerSession}
        </h3>
      </div>
      <div
        className="outer-container"
        style={{
          width: "100%",
          overflowX: "auto",
          display: "flex",
          marginBottom: "35px",
        }}
      >
        <div
          className="inner-container"
          style={{ width: "100%", display: "flex" }}
        >
          {Object.values(slots).map((group) => (
            <AppointmentButton
              key={group.date}
              date={group.date}
              day={group.day}
              slots={group.slots}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          ))}
        </div>
      </div>
      <AddTimings />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={submitHandler}
          style={{
            width: "85%",
            height: "50px",
            alignSelf: "center",
            border: "none",
            background: "#758BFF",
            color: "white",
            borderRadius: "15px",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          BOOK SESSION
        </button>
      </div>
    </>
  );
};

export default VirtualSession;
