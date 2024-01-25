import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Model from "../Model";
import qs from "qs";
import axios from "axios";

const Other = () => {
  const [other, setOther] = useState({
    user_id: "",
    topic: "",
    content: "",
  });

  //Setting database other data
  const [otherDataDB, setotherDataDB] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
  };

  const handleFormCreate = async (event) => {
    event.preventDefault();

    // Check if all required fields are filled
    for (const key in other) {
      if (other.hasOwnProperty(key) && other[key] === null) {
        return;
      }
    }

    const data = qs.stringify(other);
    // axios call
  };

  //Handle Input change function
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    //    console.log(name, value);
    setOther((prevData) => ({
      ...prevData,
      [name]: value,
      user_id: token,
    }));
  };

  //Checking user has logged
  useEffect(() => {
    if (token === "" || token === null) {
      navigate("/login");
    } else {
      console.log("yeah");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className=" container ">
      <div className="py-5 text-center"></div>

      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className=" font-custom-color">Your Language Summery</span>
          </h4>
          <ul className="list-group mb-3">
            {otherDataDB ? (
              otherDataDB.map((language, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between lh-sm"
                >
                  <div>
                    <h6 className="my-0 font-custom-color">
                      {" "}
                      {language.l_name}{" "}
                    </h6>
                    <small className="text-body-secondary font-custom-color">
                      {language.l_pro}
                    </small>
                  </div>
                  <button
                    className="btn btn-danger "
                    value={language.lan_id}
                    onClick={""}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  ></button>
                </li>
              ))
            ) : (
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0"> {"No Language proficiency added"} </h6>
                </div>
              </li>
            )}
          </ul>
        </div>

        {/*Form section two */}

        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3 font-custom-color">Other information here..</h4>
          <form
            className="needs-validation"
            method="POST"
            onSubmit={handleFormCreate}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="state" className="form-label font-custom-color">
                  Topic
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="topic"
                  placeholder="Add your program content "
                  required
                  name="topic"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="state" className="form-label font-custom-color">
                  Content
                </label>
                <textarea
                  className="form-control custom-login-input"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={handleInputChange}
                  name="content"
                  required
                ></textarea>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary mt-3 "
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <span className=" px-1">Add</span>
            </button>
          </form>
          <a href="/home" className=" btn btn-outline-secondary mt-3 ">
            <span className="ms-1">Back</span>
          </a>
          <Model
            title={"Language information"}
            message={
              message
                ? message
                : "Fetching data unsuccessful!, recheck your fields."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Other;
