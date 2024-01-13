import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import Model from "../Model";

const EducationInfo = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [EduInfo, setEduInfo] = useState({
    user_id: "",
    program: "Primary",
    program_name: "",
    institution: "",
    address: "",
    s_month: "1",
    s_year: "",
    e_month: "1",
    e_year: "",
    about: "",
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
    const data = qs.stringify(EduInfo);
    // axios call
    await axios
      .post("http://localhost:4000/api/edu/create", data, {
        headers,
      })
      .then((response) => {
        setMessage(response.data.message);
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

  //protecting this route
  useEffect(() => {
    if (token === null || token === "") {
      navigate("/login");
    } else {
      console.log("Good to go!");
      //Getting language information fro the DB
      axios
        .get(`http://localhost:4000/api/edu/user/${token}`, {
          headers,
        })
        .then((response) => {
          if (response.data.success) {
            setEduDataDB(response.data.education);
            console.log(response.data.education);
          } else {
            console.log("No data");
          }
        });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className=" container ">
      <div className="py-5 text-center">
        <h1 className="text-center mb-5 fs-3 custom-component-heading">
          Your Language Proficiency
        </h1>
      </div>

      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your Education Summery</span>
          </h4>
          <ul className="list-group mb-3">
            {eduDataDB ? (
              eduDataDB.map((eduData, i) => (
                <div className=" mb-5" key={i}>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0"> Level of Education </h6>
                      <small className="text-body-secondary">
                        {eduData.program}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0"> Program</h6>
                      <small className="text-body-secondary">
                        {eduData.program_name}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0"> Institution </h6>
                      <small className="text-body-secondary">
                        {eduData.institution}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0"> Address </h6>
                      <small className="text-body-secondary">
                        {eduData.address}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0"> Start year, month </h6>
                      <small className="text-body-secondary">
                        {eduData.s_month} {eduData.s_year}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0"> End year, month </h6>
                      <small className="text-body-secondary">
                        {eduData.e_month} {eduData.e_year}
                      </small>
                    </div>
                  </li>
                  <li className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0"> Content covered </h6>
                      <small className="text-body-secondary">
                        {eduData.about}
                      </small>
                    </div>
                  </li>
                </div>
              ))
            ) : (
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0"> No Education information found </h6>
                </div>
              </li>
            )}
          </ul>
        </div>

        {/*Form section two */}

        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Education information here..</h4>
          <form
            className="needs-validation"
            method="POST"
            onSubmit={handleFormCreate}
            noValidate
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="program" className="form-label">
                  Program
                </label>
                <select
                  className="form-select"
                  id="program"
                  required
                  name="program"
                  onChange={handleInputChange}
                >
                  <option>Primary</option>
                  <option>Secondary</option>
                  <option>Bachelor's degree</option>
                  <option>Master's degree</option>
                  <option>Doctoral degree</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="program_name" className="form-label">
                  Program name
                </label>
                <input
                  type="text"
                  className="form-control"
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
                <label htmlFor="institution" className="form-label">
                  Institution name
                </label>
                <input
                  type="text"
                  className="form-control"
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
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
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
                <label htmlFor="s_month" className="form-label">
                  Start Month
                </label>
                <select
                  className="form-select"
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
                <label htmlFor="s_year" className="form-label">
                  Start Year
                </label>
                <input
                  type="number"
                  min={1900}
                  max={2100}
                  step={1}
                  className="form-control"
                  id="s_year"
                  placeholder="Address"
                  required
                  name="s_year"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="e_month" className="form-label">
                  End Month
                </label>
                <select
                  className="form-select"
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
                <label htmlFor="e_year" className="form-label">
                  End Year
                </label>
                <input
                  type="number"
                  min={1900}
                  max={2100}
                  step={1}
                  className="form-control"
                  id="e_year"
                  placeholder="Address"
                  required
                  name="e_year"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="about" className="form-label">
                  About
                </label>
                <input
                  type="text"
                  className="form-control"
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
              Add
            </button>
          </form>
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
