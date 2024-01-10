import React, { useEffect, useState } from "react";
import UserPofile from "../components/UserPofile";
import NewSession from "../components/NewSession";
import PreviousSession from "../components/PreviousSession";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { RingLoader } from "react-spinners";
import "../styles/NewSession.css";

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
      setLoading(false);
      console.log("fetchuser called", sessionStorage.getItem("ongoingSession"));
      if (sessionStorage.getItem("ongoingSession")) {
        const datat = await axios.get(
          `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/session/get/${sessionStorage.getItem(
            "ongoingSession"
          )}`
        );
        sessionStorage.removeItem("ongoingSession");
        console.log("delated....");
      }
    };

    fetchData();
  }, []);
  const [userData, setUserData] = useState({ _id: "", sessions: "" });
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [email, setEmail] = useState(
    sessionStorage.userData && JSON.parse(sessionStorage.userData)
      ? JSON.parse(sessionStorage.userData).email
      : ""
  );
  const [userId, setUserId] = useState(
    sessionStorage.userData && JSON.parse(sessionStorage.userData)
      ? JSON.parse(sessionStorage.userData)._id
      : ""
  );
  const [sessions, setSessions] = useState(
    sessionStorage.sessions ? JSON.parse(sessionStorage.sessions) : []
  );
  const [isAuth, setIsAuth] = useState(
    sessionStorage.isAuth ? JSON.parse(sessionStorage.isAuth) : false
  );
  useEffect(() => {
    const authData = async () => {
      if (isAuthenticated && !isLoading) {
        setEmail(user.email);
        setUserData(await fetchUser(user.email));
        sessionStorage.setItem("isAuth", true);
        setIsAuth(true);
      } else if (email) {
        setUserData(await fetchUser(email));
      }
    };
    authData();
  }, [user, isAuthenticated, isLoading, isAuth, email]);

  const fetchUser = async (email) => {
    try {
      const res = await axios.get(
        `https://ixa4owdo1d.execute-api.ap-south-1.amazonaws.com/profile/get/${email}`
      );
      sessionStorage.setItem("userData", JSON.stringify(res.data, null, 0));
      sessionStorage.setItem("userId", res.data._id);
      sessionStorage.setItem(
        "sessions",
        JSON.stringify(res.data.sessions, null, 0)
      );
      setSessions(res.data.sessions);
      setUserId(res.data._id);
      sessionStorage.setItem("name", res.data.nickname);
      sessionStorage.setItem("picture", res.data.picture);
      return res.data;
    } catch (error) {
      console.log("fetch user error: ", error);
    }
  };
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
      <RingLoader color={"purple"} loading={true} size={150} />
    </div>
  ) : (
    <div>
      <UserPofile setUserId={setUserId} />
      <NewSession userId={userId} userData={userData} />
      {filledUserCount <= 100 && isAuth !== true ? (
        <div style={{ marginLeft: "9.3vw", marginTop: "15px" }}>
          <div
            className="LeftCard"
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              background: "rgba(117, 139, 255, 1)",
              color: "white",
              fontSize: 24,
              fontFamily: "'Nunito Sans', sans-serif ",
              fontWeight: "800",
              lineHeight: "40px",
              wordWrap: "break-word",
              width: "91%",
              height: "275px",
              marginBottom: "20px",
              marginLeft: "1px",
              margin: "30px 8vw 30px 0px",
              letterSpacing: "0",
            }}
          >
            Unlock tranquility! Free therapy for the first 100. Hurry, only{" "}
            {100 - filledUserCount} spots left! Register now!
          </div>
        </div>
      ) : (
        <PreviousSession sessionDetail={sessions} />
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
