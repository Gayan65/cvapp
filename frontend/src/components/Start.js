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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-fill-check me-2 "
                viewBox="0 0 16 16"
              >
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
              </svg>
              Login
            </a>
            <a
              className="btn btn-outline-secondary btn-lg px-4"
              href="/register"
            >
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
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
