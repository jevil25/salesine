import React from "react";
import Navbar from "../components/Navbar";
import Company from "../components/Company";
import moment from "moment";

const Activity = () => {
  return (
    <div>
      <Navbar
        type="activity"
        />
      <Company />
    </div>
  );
};

export default Activity;
