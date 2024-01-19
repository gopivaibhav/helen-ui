import React from "react";
import HeaderMP from "../components/Marketplace/HeaderMP";
import DoctorList from "../components/Marketplace/DoctorList";
import FooterMP from "../components/Marketplace/FooterMP";

const Marketplace = () => {
  return (
    <>
      <div
        style={{
          marginLeft: "6.3vw",
          marginBottom: "15vh",
        }}
      >
        <HeaderMP BackUrl={""} PageName={"Meet Helen"} />
        <DoctorList />
      </div>
      <FooterMP />
    </>
  );
};

export default Marketplace;
