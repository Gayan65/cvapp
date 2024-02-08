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

const WorkExInfo = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [ExpInfo, setExpInfo] = useState({
    user_id: "",
    position: null,
    employer: null,
    address: null,
    s_month: "1",
    s_year: null,
    e_month: "1",
    e_year: null,
    task: null,
  });
  const [expDataDB, setExpDataDB] = useState(null);
  const [message, setMessage] = useState(null);

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
  };

  //Handle Create function
  const handleFormCreate = async (event) => {
    event.preventDefault();

    // Check if all required fields are filled
    for (const key in ExpInfo) {
      if (ExpInfo.hasOwnProperty(key) && ExpInfo[key] === null) {
        return;
      }
    }

    const data = qs.stringify(ExpInfo);
    // axios call
    await axios
      .post("https://instar-resume-bakend.onrender.com/api/exp/create", data, {
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
    setExpInfo((prevData) => ({
      ...prevData,
      [name]: value,
      user_id: token,
    }));
  };

  // Delete function
  const handleDelete = (exp_id) => {
    if (exp_id === undefined || exp_id === null) {
      window.location.reload();
    } else {
      axios
        .delete(
          `https://instar-resume-bakend.onrender.com/api/exp/delete/${exp_id}`,
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
      //Getting exp information fro the DB
      axios
        .get(
          `https://instar-resume-bakend.onrender.com/api/exp/user/${token}`,
          {
            headers,
          }
        )
        .then((response) => {
          if (response.data.success) {
            setExpDataDB(response.data.work_exp);
            console.log(response.data.work_exp);
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
            <span className="font-custom-color">Your work experience</span>
          </h4>
          <ul className="list-group mb-3">
            {expDataDB ? (
              expDataDB.map((expData, i) => (
                <div className=" mb-5" key={i}>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0 font-custom-color"> Position</h6>
                      <small className="text-body-secondary font-custom-color">
                        {expData.position}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0 font-custom-color"> Employer</h6>
                      <small className="text-body-secondary font-custom-color">
                        {expData.employer}
                      </small>
                    </div>
                  </li>

                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0 font-custom-color"> Address </h6>
                      <small className="text-body-secondary font-custom-color">
                        {expData.address}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0 font-custom-color">
                        {" "}
                        Start year, month{" "}
                      </h6>
                      <small className="text-body-secondary font-custom-color">
                        {expData.s_month} {expData.s_year}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0 font-custom-color">
                        {" "}
                        End year, month{" "}
                      </h6>
                      <small className="text-body-secondary font-custom-color">
                        {expData.e_month} {expData.e_year}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0 font-custom-color">
                        {" "}
                        Tasks, Achievements{" "}
                      </h6>
                      <small className="text-body-secondary font-custom-color">
                        {expData.task}
                      </small>
                    </div>
                  </li>
                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => handleDelete(expData.exp_id)}
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
          <h4 className="mb-3 font-custom-color">Work information here..</h4>
          <form
            className="needs-validation"
            method="POST"
            onSubmit={handleFormCreate}
            noValidate
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label
                  htmlFor="position"
                  className="form-label font-custom-color"
                >
                  Position
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="position"
                  placeholder="Position"
                  required
                  name="position"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid position is required.
                </div>
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="employer"
                  className="form-label font-custom-color"
                >
                  Employer
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="employer"
                  placeholder="Employer"
                  required
                  name="employer"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid employer is required.
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
                  Valid address is required.
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
                  placeholder="Start Year"
                  required
                  name="s_year"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
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
                  End Year or Type "Current" if you are still working
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="e_year"
                  placeholder="End Year"
                  required
                  name="e_year"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="task" className="form-label font-custom-color">
                  Tasks, Achievements
                </label>
                <textarea
                  type="text"
                  rows={5}
                  className="form-control custom-login-input"
                  id="task"
                  placeholder="Add your Tasks, Achievements "
                  required
                  name="task"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid Tasks or Achievements required.
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

export default WorkExInfo;
