import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../images/logos/LogoSmall.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import homeImage from "../../images/assetsImg/homeimage.png";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

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
            <h1 className=" fw-semibold mb-4 ">
              Welcome {`${fetchUser.fname} ${fetchUser.lname}`},
            </h1>

            <p className="fs-4 increased-line-spacing-subheading">
              click below button to navigate each section and, make sure to
              follow all the instructions carefully,
            </p>

            <a
              className="btn btn-primary btn-lg px-5 fs-4 py-3 mt-4 custom-btn-start custom-btn-shadow"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
            >
              <FontAwesomeIcon icon={faPencil} />
              <span className="ms-3">Build you resume</span>
            </a>
            <img
              className=" mt-5 "
              src={homeImage}
              alt="Bootstrap Themes"
              width="545"
              height="700"
            />
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              {/* off canvas header starts here */}
              <div className="offcanvas-header">
                <h5
                  className="offcanvas-title fs-3 fw-semibold custom-offcanvas-font"
                  id="offcanvasExampleLabel"
                >
                  <img src={logoImg} alt="" width="128" height="48" />
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>

              {/* off canvas body starts here */}

              <div className="offcanvas-body">
                <div className="text-start mb-4 custom-offcanvas-font fs-5 ">
                  Dear {fetchUser.fname}, Visit each section and fill all the
                  details appropriately.
                </div>
                <div className="offcanvas-custom-border py-2 px-3 mt-2 ">
                  <p className=" text-start mb-1 fs-5 ">
                    <a className="offcanvas-custom-link" href="/personal_info">
                      Personal information
                    </a>
                  </p>
                  <p className="text-start fs-6 offcanvas-custom-font-color">
                    You can add your personal information via this link.
                  </p>
                </div>

                <div className="offcanvas-custom-border py-2 px-3 mt-2">
                  <p className=" text-start mb-1 fs-5">
                    <a className="offcanvas-custom-link" href="/contact_info">
                      Contact information
                    </a>
                  </p>
                  <p className="text-start fs-6 offcanvas-custom-font-color">
                    You can add your contact information such as, email, contact
                    number and etc via this link.
                  </p>
                </div>

                <div className="offcanvas-custom-border py-2 px-3 mt-2">
                  <p className=" text-start mb-1 fs-5">
                    <a className="offcanvas-custom-link" href="/language_info">
                      Language information
                    </a>
                  </p>
                  <p className="text-start fs-6 offcanvas-custom-font-color">
                    You can add your language information via this link.
                  </p>
                </div>

                <div className="offcanvas-custom-border py-2 px-3 mt-2">
                  <p className=" text-start mb-1 fs-5 ">
                    <a className="offcanvas-custom-link" href="/education_info">
                      Education Background
                    </a>
                  </p>
                  <p className="text-start fs-6 offcanvas-custom-font-color">
                    You can add your education level via this link.
                  </p>
                </div>

                <div className="offcanvas-custom-border py-2 px-3 mt-2">
                  <p className=" text-start mb-1 fs-5 ">
                    <a className="offcanvas-custom-link" href="/work_ex_info">
                      Work Experience
                    </a>
                  </p>
                  <p className="text-start fs-6 offcanvas-custom-font-color">
                    You can add your work experience in this section via this
                    link.
                  </p>
                </div>

                <div className="offcanvas-custom-border py-2 px-3 mt-2">
                  <p className=" text-start mb-1 fs-5 ">
                    <a className="offcanvas-custom-link" href="/other">
                      Other Information
                    </a>
                  </p>
                  <p className="text-start fs-6 offcanvas-custom-font-color">
                    You can add your other highlights in this section link.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
