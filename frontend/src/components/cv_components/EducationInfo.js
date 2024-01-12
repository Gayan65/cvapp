import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EducationInfo = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [EudInfo, setEduInfo] = useState({
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

  //Handle Create function
  const handleFormCreate = async (event) => {
    event.preventDefault();
    console.log("add clicked");
  };

  //Handle Input change function
  const handleInputChange = (event) => {};

  //protecting this route
  useEffect(() => {
    if (token === null || token === "") {
      navigate("/login");
    } else {
      console.log("Good to go!");
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
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0"> hi </h6>
                <small className="text-body-secondary">Hi</small>
              </div>
            </li>
          </ul>
        </div>

        {/*Form section two */}

        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Education information here..</h4>
          <form
            className="needs-validation"
            method="POST"
            onSubmit={handleFormCreate}
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
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <button className="btn btn-primary mt-3 " type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EducationInfo;
