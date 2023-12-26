import React, { useEffect, useState } from "react";
import UserPofile from "../components/UserPofile";
import NewSession from "../components/NewSession";
import PreviousSession from "../components/PreviousSession";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
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
  const [userData, setUserData] = useState({});
  const { user, isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    const authData = async () => {
      if (isAuthenticated && !isLoading) {
        setUserData(await fetchUser(user.email));
      }
    };
    authData();
  }, [user, isAuthenticated, isLoading]);
  return (
    <div>
      <UserPofile />
      <NewSession userId={userData._id} />
      <PreviousSession sessionDetail={userData.sessions} />
      <a
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
      </a>
    </div>
  );
};

export default HelenMain;
