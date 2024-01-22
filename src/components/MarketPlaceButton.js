const MarketplaceButton = ({ data }) => {
    return (<button style={{
        display: "inline-flex",
        height: "34px",
        padding: " 10px 16px",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        flexShrink: 0,
        borderRadius: "15px",
        border: "1px  #E4E4E7",
        boxShadow: "0px 0px 0px 2px #E6EFEF",
        backgroundColor: "#FFFFFF",
        margin:"10px 5px",
    }}>
        {data}
    </button >);
}

export default MarketplaceButton;