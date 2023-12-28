import React, { useEffect, useState } from "react";
import UserPofile from "../components/UserPofile";
import NewSession from "../components/NewSession";
import PreviousSession from "../components/PreviousSession";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { RingLoader } from "react-spinners";
import "../styles/NewSession.css";
const fetchUser = async (email) => {
  try {
    const user = await axios.get(
      `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/profile/get/${email}`
    );
    return user.data;
  } catch (error) {
    console.log("fetch user error: ", error);
  }
};
const HelenMain = () => {
  const [loading, setLoading] = useState(true);
  const [filledUserCount, setFilledUserCount] = useState(100);
  useEffect(() => {
    // Simulate data fetching or other async operations
    const fetchData = async () => {
      const userCount = await axios.get(
        `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/profile/total`
      );
      setFilledUserCount(userCount.data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);
  const [userData, setUserData] = useState({ _id: "", sessions: "" });
  const { user, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    const authData = async () => {
      if (isAuthenticated && !isLoading) {
        setUserData(await fetchUser(user.email));
      }
    };
    authData();
  }, [user, isAuthenticated, isLoading]);

  console.log(filledUserCount);
  return loading ? (
    // Display the loader when loading is true
    <div
      className="loader"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <RingLoader color={"red"} loading={true} size={150} />
    </div>
  ) : (
    <div>
      <UserPofile />
      <NewSession userId={userData && userData._id ? userData._id : ""} />
      {filledUserCount <= 100 && !isAuthenticated ? (
        <div style={{ marginLeft: "9.3vw", marginTop: "15px" }}>
          <div
            className="LeftCard"
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign:"center",
              alignItems: "center",
              background: "#FF7777",
              color: "white",
              fontSize: 24,
              fontFamily: "Nunito Sans",
              fontWeight: "800",
              lineHeight: "40px",
              wordWrap: "break-word",
              width: "91%",
              height: "275px",
              marginBottom: "20px",
              marginLeft: "1px",
              margin: "30px 8vw 30px 0px",
            }}
          >
            Unlock tranquility! Free therapy for the first 100. Hurry, only{" "}
            {100 - filledUserCount} spots left! Register now!
          </div>
        </div>
      ) : (
        <PreviousSession
          sessionDetail={userData && userData.sessions ? userData.sessions : ""}
        />
      )}

      {/* <a
        target="_blank"
        rel="noopener noreferrer"
        href={"http://collegeit.org/privacy"}
        className="text-blue-800 hover:underline"
      >
        privacy policy
      </a>{" "}
      and{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={"http://collegeit.org/tos"}
        className="text-blue-800 hover:underline"
      >
        terms of service
      </a> */}
    </div>
  );
};

export default HelenMain;
