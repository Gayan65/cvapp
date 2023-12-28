import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //Checking user has logged
  useEffect(() => {
    if (token === "" || token === null) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return <div>Home</div>;
};

export default Home;
