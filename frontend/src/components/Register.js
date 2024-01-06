import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import loginLogo from "../images/logos/LogoSmall.png";

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
              className="form-control mb-3"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={handleInputChange}
              name="email"
              value={inputData.email}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control mb-3"
              id="floatingPassword"
              placeholder="Password"
              required
              name="password"
              onChange={handleInputChange}
              value={inputData.password}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control mb-3"
              id="floatingFname"
              placeholder="First Name"
              required
              name="fname"
              onChange={handleInputChange}
              value={inputData.fname}
            />
            <label htmlFor="floatingFname">First Name</label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="form-control mb-3"
              id="floatingLname"
              placeholder="Last Name"
              required
              name="lname"
              onChange={handleInputChange}
              value={inputData.lname}
            />
            <label htmlFor="floatingLname">Last Name</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-fill-add me-2 "
              viewBox="0 0 16 16"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
            </svg>
            Signup
          </button>
          <p className="mt-5 mb-3 text-body-secondary">
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
