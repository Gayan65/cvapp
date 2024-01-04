import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Personal_Info = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [fetchPersonal, setFetchPersonal] = useState({
    user_id: "",
    moto: "",
    description: "",
    image: "",
  });

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  //protecting this route
  useEffect(() => {
    if (token === null || token === "") {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:4000/api/personal/find/${token}`, { headers })
        .then((response) => {
          setFetchPersonal(response.data.personal[0]);
        })
        .catch((error) => {
          // Handle errors
          console.error("Error fetching user data:", error);
        });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className=" container mt-3 ">
      <div className="row">
        <h1 className="text-center mb-5 fs-3 custom-component-heading">
          Personal Information section
        </h1>

        {/* Renders the profile info */}

        <div className="mb-3" style={{ maxWidth: "800px" }}>
          <div className="row g-0">
            <div className="col-md-4 me-5">
              <img
                src={`data:image/png;base64,${fetchPersonal.image}`}
                className="img-fluid mb-3 img-custom"
                alt="profile"
              />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h5 className="card-title mb-3 fw-semibold ">
                  {fetchPersonal.moto}
                </h5>
                <p className="card-text fst-italic mb-3 ">
                  {fetchPersonal.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Renders the profile info end */}

        {/*Add Form for moto, description, image, user_id will be send as the token and decorded in the server end */}
        <div>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Add your moto here...
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                The best way to describe about you..
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Add your profile image..
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                required
              />
              <button className=" btn btn-primary mt-3 ">Save</button>
            </div>
          </form>
        </div>
        {/* form end */}
      </div>
    </div>
  );
};

export default Personal_Info;
