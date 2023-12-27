import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import loginLogo from "../images/logos/LogoSmall.png";

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
      .post("http://localhost:4000/api/user/login", data)
      .then((response) => {
        if (response.data.success) {
          navigate("/home");
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
      <main className="form-signin w-100 m-auto">
        <form method="POST" onSubmit={handleSubmit} className=" mt-5 ">
          <img className="mb-4" src={loginLogo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              name="password"
              onChange={handleInputChange}
              value={inputData.password}
            />
            <label htmlFor="floatingPassword">Password</label>
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
          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-body-secondary">
            Craft Your Success Story with Us..
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
