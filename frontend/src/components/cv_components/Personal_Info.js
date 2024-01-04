import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Personal_Info = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [fetchPersonal, setFetchPersonal] = useState({
    user_id: "",
    moto: "",
    description: "",
    image: "",
  });

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  //protecting this route
  useEffect(() => {
    if (token === null || token === "") {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:4000/api/personal/find/${token}`, { headers })
        .then((response) => {
          setFetchPersonal(response.data.personal[0]);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching user data:", error);
        });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className=" container mt-3 ">
      <div className="row">
        <h1 className="text-center mb-5 fs-3 custom-component-heading">
          Personal Information section
        </h1>

        {/* Renders the profile info */}
        <div className="col-md-5 order-md-1">
          <img
            className="bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto"
            width="300"
            height="300"
            src={`data:image/png;base64,${fetchPersonal.image}`}
            alt="Profile"
          />
        </div>
        <div className="col-md-7 order-md-2">
          <h2 className="fs-3 text-body-secondary">{fetchPersonal.moto}</h2>
          <p className="lead">{fetchPersonal.description}</p>
        </div>
        {/* Renders the profile info end */}
      </div>
    </div>
  );
};

export default Personal_Info;
