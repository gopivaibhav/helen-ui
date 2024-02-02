const TimingButton = ({ time, selectedTime, setSelectedTime }) => {
  const handleClick = () => {
    setSelectedTime(time);
  };

  const convert12HourTo24Hour = (time12hr) => {
    const [time, modifier] = time12hr.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12" && modifier === "AM") {
      hours = "00";
    } else if (modifier === "PM") {
      hours = (parseInt(hours, 10) + 12).toString().padStart(2, "0");
    }

    return `${hours}:${minutes}`;
  };
  return (
    <button
      onClick={handleClick}
      style={{
        width: "22%",
        padding: "14px",
        borderRadius: "15px",
        margin: "1.5%",
        background: selectedTime === time ? "#758BFF" : "white",
        color: selectedTime === time ? "white" : "black",
        border: "1px solid #E4E4E7",
      }}
    >
      {convert12HourTo24Hour(time)}
    </button>
  );
};

export default TimingButton;