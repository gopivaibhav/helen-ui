import MarketplaceButton from "./MarketPlaceButton";
const Profile = ({ therapistInfo }) => {
  return (
    <div style={{ margin: "0 15px" }}>
      <p style={{ fontWeight: "400", color: "#424242", marginBottom: "10%" }}>
        {therapistInfo.description}
      </p>
      <h3 style={{ marginBottom: "5%" }}>What can I help you with?</h3>
      <div className="tags" style={{ marginBottom: "5%" }}>
        {therapistInfo &&
          therapistInfo.servicesOffered &&
          therapistInfo.servicesOffered.map((tag, index) => (
            <MarketplaceButton key={index} data={tag} />
          ))}
      </div>
      <h3 style={{ marginBottom: "5%" }}>I can speak</h3>
      <p style={{ color: "#424242", marginBottom: "10%" }}>
        {therapistInfo &&
          therapistInfo.languagesSpoken &&
          therapistInfo.languagesSpoken.map((tag, index) => (
            <MarketplaceButton key={index} data={tag} />
          ))}
      </p>
      <h3 style={{ marginBottom: "5%" }}>Education & Affiliations</h3>

      {therapistInfo &&
        therapistInfo.education &&
        therapistInfo.education.map((tag, index) => (
          <p style={{ marginBottom: "3%" }} key={index}>
            -{tag}
          </p>
        ))}
    </div>
  );
};

export default Profile;
