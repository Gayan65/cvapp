import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../images/logos/LogoSmall.png";
import qs from "qs";
import axios from "axios";
import PasswordChange from "../PasswordChange";

const Profile = () => {
  const navigate = useNavigate();
  //Getting token
  const token = sessionStorage.getItem("token");

  //Start state of the component
  const [fetchUser, setFetchUser] = useState({
    fname: "",
    lname: "",
  });

  //set state for the API response
  const [message, setMessage] = useState(null);

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // Fetching the user data from the backend via token
  useEffect(() => {
    if (token === "" || token === null) {
      navigate("/login");
    } else {
      axios
        .get(
          `https://instar-resume-bakend.onrender.com/api/user/find/${token}`,
          { headers }
        )
        .then((response) => {
          setFetchUser(response.data.user[0]);
        })
        .catch((error) => {
          // Handle errors
          //once the token expires user redirect to the Error page
          if (error.response.status === 403) navigate("/login");
          else console.error("Error fetching user data:", error);
        });
    }

    // eslint-disable-next-line
  }, []);

  //Handling inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFetchUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handling form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = qs.stringify(fetchUser);
    await axios
      .put(
        `https://instar-resume-bakend.onrender.com/api/user/update/${fetchUser.user_id}`,
        data,
        {
          headers,
        }
      )
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        // Handle errors
        //console.error("Error fetching user data:", error.response.status);
        //once the token expires user redirect to the Error page
        if (error.response.status === 403) navigate("/login");
        else console.error("Error fetching user data:", error);
      });
  };

  return (
    <div className=" container ">
      <div className="py-5 text-center">
        <img
          className="d-block mx-auto mb-4"
          src={logoImg}
          alt="Logo"
          width="128"
          height="48"
        />
        <p className="lead font-custom-color">
          This profile page is a dedicated space that provides a personalized
          and customizable view of own information and typically serves as a
          central hub for to manage your account settings within this platform.
        </p>
      </div>
      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="font-custom-color">Your Profile Summary</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm p-3">
              <div>
                <h6 className="my-0 font-custom-color">Email Address</h6>
              </div>
              <span className="text-body-secondary font-custom-color">
                {fetchUser.email}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm p-3">
              <div>
                <h6 className="my-0 font-custom-color">First Name</h6>
              </div>
              <span className="text-body-secondary font-custom-color">
                {fetchUser.fname}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm p-3">
              <div>
                <h6 className="my-0 font-custom-color">Last Name</h6>
              </div>
              <span className="text-body-secondary font-custom-color">
                {fetchUser.lname}
              </span>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3 font-custom-color">Edit Your Profile Settings</h4>

          <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="row g-3 mb-3 ">
              <div className="col-sm-6">
                <label
                  htmlFor="firstName"
                  className="form-label font-custom-color"
                >
                  First name
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="firstName"
                  name="fname"
                  onChange={handleInputChange}
                  value={fetchUser.fname}
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div className="col-sm-6">
                <label
                  htmlFor="lastName"
                  className="form-label font-custom-color"
                >
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="lastName"
                  name="lname"
                  onChange={handleInputChange}
                  value={fetchUser.lname}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn" type="submit">
              Save
            </button>
          </form>
          {message && (
            <div className="alert alert-primary mt-3" role="alert">
              {message}
            </div>
          )}

          <h4 className="my-3 font-custom-color">Privacy</h4>
          <PasswordChange userId={fetchUser.user_id} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
