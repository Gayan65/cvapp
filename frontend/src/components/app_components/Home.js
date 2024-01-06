import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../images/logos/LogoSmall.png";
import axios from "axios";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-vector-pen me-2 "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"
                />
                <path
                  fillRule="evenodd"
                  d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086z"
                />
              </svg>
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
