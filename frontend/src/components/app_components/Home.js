import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../images/logos/LogoSmall.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  //window.location.reload(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //Start state of the component
  const [fetchUser, setFetchUser] = useState({
    fname: "",
    lname: "",
  });

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  //Checking user has logged
  useEffect(() => {
    if (token === "" || token === null) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:4000/api/user/find/${token}`, { headers })
        .then((response) => {
          setFetchUser(response.data.user[0]);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching user data:", error);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">
              Hi {`${fetchUser.fname} ${fetchUser.lname}`},
            </h1>
            <p className="lead text-body-secondary">
              Welcome to the INSTARESUME, click "Start" button to navigate each
              section and, make sure to follow all the instructions carefully,
            </p>

            <a
              className="btn btn-primary btn-lg"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
            >
              <FontAwesomeIcon icon={faPenNib} />
              <span className="ms-2">Start</span>
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
                  Dear {fetchUser.fname}, Visit each section and fill all the
                  details appropriately.
                </div>
                <p className=" text-start mb-1">
                  <a
                    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    href="/personal_info"
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
                    href="/contact_info"
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
                    href="/language_info"
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
