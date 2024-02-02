const AppointmentButton = ({ date, day, slots, setSelectedDate, selectedDate }) => {
  const fomattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
  return (
    <button onClick={() => setSelectedDate(date)}
      style={{
        width: "45%",
        padding: "10px",
        minWidth: "45%",
        margin: "0 5px",
        backgroundColor: selectedDate === date ? "#758BFF" : "white",
        color: selectedDate === date ? "white" : "black",
        border: "1px solid #E4E4E7",
        borderRadius: "10px",
      }}
    >
      <p
        style={{
          textAlign: "left",
          fontWeight: "300",
          fontFamily: "Nunito sans",
          marginBottom: "10px",
        }}
      >
        {day}
      </p>
      <h4
        style={{
          textAlign: "left",
          fontWeight: "700",
          fontSize: "16px",
          fontFamily: "Nunito sans",
        }}
      >
        {fomattedDate} ({slots.length === 0 ? "No": slots.length} slots)
      </h4>
    </button>
  );
};

export default AppointmentButton;