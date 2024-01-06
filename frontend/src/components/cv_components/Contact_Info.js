import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Contact_Info = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  //protecting this route
  useEffect(() => {
    if (token === null || token === "") {
      navigate("/login");
    } else {
      console.log("You are fine!");
    }
    // eslint-disable-next-line
  }, []);

  return <div>Contact_Info</div>;
};

export default Contact_Info;
