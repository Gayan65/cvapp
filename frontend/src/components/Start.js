import React from "react";
import headingImg from "../images/assetsImg/professional.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPen } from "@fortawesome/free-solid-svg-icons";

const Start = () => {
  return (
    <div>
      <div className="container col-xxl-8 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-7">
            <img
              src={headingImg}
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="745"
              height="559"
              loading="lazy"
            />
          </div>
          <div className="col-lg-5">
            <h1 className="display-5 fw-bold text-body-emphasis increased-line-spacing-heading mb-5 text-end">
              "Elevate Your Professional Profile with isntarResume”
            </h1>
            <p className="lead increased-line-spacing-subheading fs-4 text-end mb-4">
              Designed to effortlessly showcase your skills and experience in
              the best light possible.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <a
                className="btn btn-primary btn-lg px-4 gap-3 btn-custom-animation-n-y custom-btn-shadow "
                href="/login"
              >
                <span className=" mx-4 fs-4  ">Login</span>
              </a>
              <a
                className="btn btn-outline-secondary btn-lg px-4 btn-custom-animation-p-y custom-btn-shadow"
                href="/register"
              >
                <span className="mx-3 fs-4 ">Sign Up</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
