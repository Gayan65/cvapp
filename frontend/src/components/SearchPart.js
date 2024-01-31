import React from "react";
import subHeadingImg from "../images/assetsImg/custemise.png";
import UrlUpdater from "./UrlUpdater";

const SearchPart = () => {
  return (
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
            <UrlUpdater />
          </div>
        </div>
        <div className="col-10 col-sm-8 col-lg-5">
          <img
            src={subHeadingImg}
            className="d-block mt-4  img-fluid"
            alt="Bootstrap Themes"
            width="459"
            height="505"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPart;
