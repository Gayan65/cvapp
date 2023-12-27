import React from "react";
import loginLogo from "../images/logos/LogoSmall.png";

const Login = () => {
  return (
    <div>
      <main className="form-signin w-100 m-auto">
        <form className=" mt-5 ">
          <img className="mb-4" src={loginLogo} alt="" width="72" height="72" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control mb-3"
              id="floatingInput"
              placeholder="name@example.com"
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
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
              required
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
