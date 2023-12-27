import React from "react";
import smallLoago from "../images/logos/LogoSmall.png";

const Start = () => {
  return (
    <div>
      <div className="px-4 py-5 my-5 text-center">
        <img
          className="d-block mx-auto mb-4"
          src={smallLoago}
          alt=""
          width="72"
          height="72"
        />
        <h1 className="display-5 fw-bold text-body-emphasis font-custom-color">
          InstarResume
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 font-custom-color">
            Elevate your career with "InstarResume", the ultimate resume-making
            solution designed to empower you on your professional journey. Craft
            visually stunning resumes effortlessly, and showcase your skills and
            experiences in a way that stands out.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <a className="btn btn-primary btn-lg px-4 gap-3" href="/login">
              Login
            </a>
            <a
              className="btn btn-outline-secondary btn-lg px-4"
              href="/register"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;