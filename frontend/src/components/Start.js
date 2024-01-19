import React from "react";
import headingImg from "../images/assetsImg/professional.png";
import subHeadingImg from "../images/assetsImg/custemise.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faShieldHalved,
  faPenToSquare,
  faHandshake,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

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
      <div className=" container  mt-5 ">
        <div className=" row-cols-auto "></div>
        <p className=" fs-4 fw-bold ">Feature with</p>
        <div class="container px-2 py-2 custom-feature" id="hanging-icons">
          <div class="row g-4 py-2 row-cols-1 row-cols-lg-4">
            <div class="col d-flex justify-content-center align-items-center">
              <p class="fs-4">
                <FontAwesomeIcon icon={faUserGroup} />
                <span className=" ms-1 ">Collaboration</span>
              </p>
            </div>
            <div class="col d-flex justify-content-center  align-items-center">
              <p class="fs-4">
                <FontAwesomeIcon icon={faShieldHalved} />
                <span className=" ms-1 ">Security</span>
              </p>
            </div>
            <div class="col d-flex justify-content-center  align-items-center">
              <p class="fs-4">
                <FontAwesomeIcon icon={faPenToSquare} />
                <span className=" ms-1 ">Customization</span>
              </p>
            </div>
            <div class="col d-flex justify-content-center  align-items-center">
              <p class="fs-4">
                <FontAwesomeIcon icon={faHandshake} />
                <span className=" ms-1 ">Intuitive</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container col-xxl-8 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-lg-7">
            <h1 className="fs-1 fw-bold text-body-emphasis increased-line-spacing-heading mb-5 text-start">
              Empower your resume with personalization,
            </h1>
            <p className="lead increased-line-spacing-subheading fs-4 text-start mb-4">
              our web app allows users to seamlessly integrate their preferred
              topics, ensuring a CV that truly reflects individual expertise and
              aspirations.
            </p>
            <p className="lead increased-line-spacing-subheading fs-5 text-start mb-4">
              Search your future employee here..
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <div class="input-group input-group-lg">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                />
                <span
                  class="input-group-text magnifying-icon"
                  id="inputGroup-sizing-lg"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </div>
            </div>
          </div>
          <div className="col-10 col-sm-8 col-lg-5">
            <img
              src={subHeadingImg}
              className="d-block mt-4  img-fluid"
              alt="Bootstrap Themes"
              width="459"
              height="505"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
