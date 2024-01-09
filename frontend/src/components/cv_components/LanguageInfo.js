import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LanguageInfo = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //Protecting route
  useEffect(() => {
    if (token === null || token === "") {
      navigate("/login");
    } else {
      console.log("Good to go");
    }
    // eslint-disable-next-line
  }, []);

  return <div>LanguageInfo</div>;
};

export default LanguageInfo;
