import React from "react";
import Navbar from "../components/navbar";
import Overview from "../components/overview";

const page = () => {
  return (
    <div>
      <Navbar title="Overview" />

      <Overview/>
    </div>
  );
};

export default page;
