import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Other = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //Checking user has logged
  useEffect(() => {
    if (token === "" || token === null) {
      navigate("/login");
    } else {
      console.log("yeah");
    }
    // eslint-disable-next-line
  }, []);
  return <div>Other</div>;
};

export default Other;
