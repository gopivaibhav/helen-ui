import MarketplaceButton from "./MarketPlaceButton";
const Profile = () => {
    return (
        <div style={{margin:"0 15px"}}>
            <p style={{fontWeight:"400",color:"#424242",marginBottom:"10%"}}>Hello, I’m name. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et euismod libero, id pellentesque lacus. Nulla ut libero eu metus mollis rutrum non a Read more</p>
            <h3 style= {{marginBottom:"5%"}}>What can I help you with?</h3>
            <div className="tags" style={{marginBottom:"5%"}}>
            <MarketplaceButton data="Work stress" />
            <MarketplaceButton data="Anxiety" />
            <MarketplaceButton data="Depression" />
            <MarketplaceButton data="Catastrophic thoughts" />
            <MarketplaceButton data="Relationship Issues" />
            </div>
            <h3 style={{marginBottom:"5%"}}>I can speak</h3>
            <p style={{color:"#424242", marginBottom:"10%"}}>Hindi, English, Malayalam, and Bengali</p>
            <h3 style={{marginBottom:"5%"}}>Education & Affiliations</h3>
            <p style={{marginBottom:"3%"}}>-MSc.University of mumbai</p>
            <p style={{marginBottom:"3%"}}>-MSc.University of mumbai</p>
            <p style={{marginBottom:"3%"}}>-MSc.University of mumbai</p>
            <p style={{marginBottom:"3%"}}>-MSc.University of mumbai</p>
            <p style={{marginBottom:"3%"}}>-MSc.University of mumbai</p>
            <p style={{marginBottom:"3%"}}>-MSc.University of mumbai</p>
            
        </div>
    );
}

export default Profile;
