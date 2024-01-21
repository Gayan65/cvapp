import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import loginLogo from "../images/logos/LogoSmall.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
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
      .post("http://localhost:4000/api/user_login/login", data)
      .then((response) => {
        if (response.data.success) {
          sessionStorage.setItem("token", response.data.token);
          navigate("/home");
          //Updating the state of the Navbar component (User status)
          window.location.reload();
        } else {
          setApiResponse(response.data);
        }
      })
      .catch((err) => console.log(err));

    //Clear inputs after submitting the form
    setInputData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <main className="form-signin w-100 m-auto custom-border-login">
        <form method="POST" onSubmit={handleSubmit}>
          <h1 className="fs-2 mb-5 fw-bold text-center ">Login</h1>

          <div className="form-floating fw-light">
            <input
              type="text"
              className="form-control mb-4 custom-login-input"
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
          <div className="form-floating fw-light">
            <input
              type="password"
              className="form-control custom-login-input"
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

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button
            className="btn btn-outline-secondary text-center py-2 px-5 "
            type="submit"
          >
            <FontAwesomeIcon icon={faUser} />
            <span className="ms-2 fs-5 ">Login</span>
          </button>
          <p className="mt-5 mb-5 text-center font-custom-color">
            No account, just{" "}
            <Link className="custom-link-signup" to={"/register"}>
              Sign up
            </Link>
            .
          </p>

          {apiResponse.success === false && (
            <div className="alert alert-danger mt-3" role="alert">
              {apiResponse.message}
            </div>
          )}
        </form>
        <img className="" src={loginLogo} alt="" width="193" height="72" />
      </main>
    </div>
  );
};

export default Login;
