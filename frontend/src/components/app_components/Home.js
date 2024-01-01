import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../images/logos/LogoSmall.png";

const Home = () => {
  //window.location.reload(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //Checking user has logged
  useEffect(() => {
    if (token === "" || token === null) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Hi Full Name, </h1>
            <p className="lead text-body-secondary">
              Welcome to the INSTARESUME, click "Start" button to navigate each
              section and, make sure to follow all the instructions carefully,
            </p>

            <a
              className="btn btn-primary"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
            >
              Start
            </a>
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                  <img src={logoImg} alt="" width="50" height="50" /> Navigation
                  section
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div className="text-start mb-5">
                  Dear First Name, Visit each section and fill all the details
                  appropriately.
                </div>
                <p className=" text-start mb-1">
                  <a
                    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    href="/"
                  >
                    1. Personal information
                  </a>
                </p>
                <p className="text-start mb-2">
                  You can add your personal information via this link.
                </p>

                <p className=" text-start mb-1">
                  <a
                    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    href="/"
                  >
                    2. Contact information
                  </a>
                </p>
                <p className="text-start mb-2">
                  You can add your contact information such as, email, contact
                  number and etc via this link.
                </p>

                <p className=" text-start mb-1">
                  <a
                    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    href="/"
                  >
                    3. Language information
                  </a>
                </p>
                <p className="text-start mb-2">
                  You can add your language information via this link.
                </p>

                <p className=" text-start mb-1">
                  <a
                    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    href="/"
                  >
                    4. Education Background
                  </a>
                </p>
                <p className="text-start mb-2">
                  You can add your education level via this link.
                </p>

                <p className=" text-start mb-1">
                  <a
                    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    href="/"
                  >
                    5. Work Experience
                  </a>
                </p>
                <p className="text-start mb-2">
                  You can add your work experience in this section via this
                  link.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
