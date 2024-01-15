import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import loginLogo from "../images/logos/LogoSmall.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPen,
  faEnvelope,
  faKey,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    admin: 0,
  });
  const [apiResponse, setApiResponse] = useState("");
  const navigate = useNavigate();

  //Clear the session storage
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  //Handling inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Submit data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = qs.stringify(inputData);
    await axios
      .post("http://localhost:4000/api/user_login/create", data)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          navigate("/login");
        } else {
          setApiResponse(response.data);
        }
      })
      .catch((err) => console.log(err));

    //Clear inputs after submitting the form
    setInputData({
      email: "",
      password: "",
      fname: "",
      lname: "",
    });
  };

  return (
    <div>
      <main className="form-signin w-100 m-auto">
        <form method="POST" onSubmit={handleSubmit} className=" mt-5 ">
          <img className="mb-4" src={loginLogo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control mb-4"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={handleInputChange}
              name="email"
              value={inputData.email}
              required
            />
            <label htmlFor="floatingInput" className="floatingInput">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control mb-4"
              id="floatingPassword"
              placeholder="Password"
              required
              name="password"
              onChange={handleInputChange}
              value={inputData.password}
            />
            <label htmlFor="floatingPassword" className="floatingInput">
              <FontAwesomeIcon icon={faKey} /> Password
            </label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control mb-4"
              id="floatingFname"
              placeholder="First Name"
              required
              name="fname"
              onChange={handleInputChange}
              value={inputData.fname}
            />
            <label htmlFor="floatingFname" className="floatingInput">
              <FontAwesomeIcon icon={faUser} /> First Name
            </label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control mb-4"
              id="floatingLname"
              placeholder="Last Name"
              required
              name="lname"
              onChange={handleInputChange}
              value={inputData.lname}
            />
            <label htmlFor="floatingLname" className="floatingInput">
              <FontAwesomeIcon icon={faUser} /> Last Name
            </label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            <FontAwesomeIcon icon={faUserPen} />
            <span className="ms-2 fs-5 ">Register</span>
          </button>
          <p className="mt-5 mb-3 custom-font-color">
            Craft Your Success Story with Us..
          </p>

          {apiResponse.success === false && (
            <div className="alert alert-danger mt-3" role="alert">
              {apiResponse.message}
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default Register;
