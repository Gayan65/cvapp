import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import Model from "../Model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const EducationInfo = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [EduInfo, setEduInfo] = useState({
    user_id: "",
    program: "Primary",
    program_name: null,
    institution: null,
    address: null,
    s_month: "1",
    s_year: null,
    e_month: "1",
    e_year: null,
    about: null,
  });
  const [eduDataDB, setEduDataDB] = useState(null);
  const [message, setMessage] = useState(null);

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
  };

  //Handle Create function
  const handleFormCreate = async (event) => {
    event.preventDefault();

    // Check if all required fields are filled
    for (const key in EduInfo) {
      if (EduInfo.hasOwnProperty(key) && EduInfo[key] === null) {
        return;
      }
    }

    const data = qs.stringify(EduInfo);
    // axios call
    await axios
      .post("https://instar-resume-bakend.onrender.com/api/edu/create", data, {
        headers,
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        // Handle errors
        //once the token expires user redirect to the Error page
        if (error.response.status === 403) navigate("/login");
        else console.error("Error fetching user data:", error);
      });
  };

  //Handle Input change function
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEduInfo((prevData) => ({
      ...prevData,
      [name]: value,
      user_id: token,
    }));
  };

  // Delete function
  const handleDelete = (edu_id) => {
    if (edu_id === undefined || edu_id === null) {
      window.location.reload();
    } else {
      axios
        .delete(
          `https://instar-resume-bakend.onrender.com/api/edu/delete/${edu_id}`,
          {
            headers,
          }
        )
        .then((response) => {
          if (response.data.success) {
            setMessage(response.data.message);
          } else {
            console.log("No data");
          }
        })
        .catch((error) => {
          // Handle errors
          //once the token expires user redirect to the Error page
          if (error.response.status === 403) navigate("/login");
          else console.error("Error fetching user data:", error);
        });
    }
  };

  //protecting this route
  useEffect(() => {
    if (token === null || token === "") {
      navigate("/login");
    } else {
      console.log("Good to go!");
      //Getting language information fro the DB
      axios
        .get(
          `https://instar-resume-bakend.onrender.com/api/edu/user/${token}`,
          {
            headers,
          }
        )
        .then((response) => {
          if (response.data.success) {
            setEduDataDB(response.data.education);
            console.log(response.data.education);
          } else {
            console.log("No data");
          }
        })
        .catch((error) => {
          // Handle errors
          //once the token expires user redirect to the Error page
          if (error.response.status === 403) navigate("/login");
          else console.error("Error fetching user data:", error);
        });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className=" container ">
      <div className="py-5 text-center"></div>

      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="font-custom-color">Your Education Summery</span>
          </h4>
          <ul className="list-group mb-3">
            {eduDataDB ? (
              eduDataDB.map((eduData, i) => (
                <div className=" mb-5" key={i}>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0 font-custom-color">
                        Level of Education, Program
                      </h6>
                      <small className="text-body-secondary font-custom-color">
                        {eduData.program}, {eduData.program_name}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0 font-custom-color"> Institution </h6>
                      <small className="text-body-secondary font-custom-color">
                        {eduData.institution}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0 font-custom-color"> Address </h6>
                      <small className="text-body-secondary font-custom-color">
                        {eduData.address}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0 font-custom-color">
                        {" "}
                        Start year, month - End Year, month
                      </h6>
                      <small className="text-body-secondary font-custom-color">
                        {eduData.s_month} {eduData.s_year} - {eduData.e_month}{" "}
                        {eduData.e_year}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0 font-custom-color">
                        {" "}
                        Content covered{" "}
                      </h6>
                      <small className="text-body-secondary font-custom-color">
                        {eduData.about}
                      </small>
                    </div>
                  </li>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleDelete(eduData.edu_id)}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              ))
            ) : (
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0 font-custom-color">
                    {" "}
                    No Education information found{" "}
                  </h6>
                </div>
              </li>
            )}
          </ul>
        </div>

        {/*Form section two */}

        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3 font-custom-color">
            Education information here..
          </h4>
          <form
            className="needs-validation"
            method="POST"
            onSubmit={handleFormCreate}
            noValidate
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label
                  htmlFor="program"
                  className="form-label font-custom-color"
                >
                  Program
                </label>
                <select
                  className="form-select form-control custom-login-input"
                  id="program"
                  required
                  name="program"
                  onChange={handleInputChange}
                >
                  <option>Primary</option>
                  <option>Secondary</option>
                  <option>Diploma</option>
                  <option>Bachelor's degree</option>
                  <option>Master's degree</option>
                  <option>Doctoral degree</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="program_name"
                  className="form-label font-custom-color"
                >
                  Program name
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="program_name"
                  placeholder="Program name"
                  required
                  name="program_name"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="institution"
                  className="form-label font-custom-color"
                >
                  Institution name
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="institution"
                  placeholder="Institution"
                  required
                  name="institution"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="address"
                  className="form-label font-custom-color"
                >
                  Address
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="address"
                  placeholder="Address"
                  required
                  name="address"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="s_month"
                  className="form-label font-custom-color"
                >
                  Start Month
                </label>
                <select
                  className="form-select form-control custom-login-input"
                  id="s_month"
                  required
                  name="s_month"
                  onChange={handleInputChange}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="s_year"
                  className="form-label font-custom-color"
                >
                  Start Year
                </label>
                <input
                  type="number"
                  min={1900}
                  max={2100}
                  step={1}
                  className="form-control custom-login-input"
                  id="s_year"
                  placeholder="Start year"
                  required
                  name="s_year"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">Valid year is required.</div>
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="e_month"
                  className="form-label font-custom-color"
                >
                  End Month
                </label>
                <select
                  className="form-select form-control custom-login-input"
                  id="e_month"
                  required
                  name="e_month"
                  onChange={handleInputChange}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>

              <div className="col-md-6">
                <label
                  htmlFor="e_year"
                  className="form-label font-custom-color"
                >
                  End Year or Expected year..
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="e_year"
                  placeholder="End year"
                  required
                  name="e_year"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="about" className="form-label font-custom-color">
                  Content covered
                </label>
                <textarea
                  type="text"
                  rows={5}
                  className="form-control custom-login-input"
                  id="about"
                  placeholder="Add your program content "
                  required
                  name="about"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary mt-3 "
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span className="px-1">Add</span>
            </button>
          </form>
          <a href="/home" className=" btn btn-outline-secondary mt-3 ">
            <FontAwesomeIcon icon={faArrowLeft} />
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

export default EducationInfo;
