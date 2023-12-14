import React from 'react'

const ProgressBar = ({bgcolor,progress,height}) => {
	
	const Parentdiv = {
		height: "0.5rem",
		width: '30vw',
		backgroundColor: '#d5dde5',
		borderRadius: 40
	}
	
	const Childdiv = {
		height: '100%',
		width: `${progress}%`,
		backgroundColor:"#FF7777",
	    borderRadius:40,
		textAlign: 'right'
	}
	
    const Background = {
        height: "7vh",
        width: '100%',
        borderRadius: 40,
        marginTop: "6vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
	return (
    <div style={Background}>
    	<p style={{margin:"10px"}}> Session progress</p>
		<div style={Parentdiv}>
			<div style={Childdiv}></div>
		</div>
    </div>
	)
}

export default ProgressBar;
