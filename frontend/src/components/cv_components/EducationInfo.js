import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EducationInfo = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //protecting this route
  useEffect(() => {
    if (token === null || token === "") {
      navigate("/login");
    } else {
      console.log("Good to go!");
    }
    // eslint-disable-next-line
  }, []);
  return <div>EducationInfo</div>;
};

export default EducationInfo;
