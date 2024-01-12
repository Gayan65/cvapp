import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EducationInfo = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //Handle Create function
  const handleFormCreate = () => {};

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
                <label htmlFor="state" className="form-label">
                  Program
                </label>
                <select
                  className="form-select"
                  id="state"
                  required
                  name="program"
                  onChange={handleInputChange}
                >
                  <option>Masters</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Program name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Accountancy"
                  required
                  name="program_name"
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Institution name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Institution"
                  required
                  name="institution"
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Address"
                  required
                  name="address"
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="state" className="form-label">
                  Start Month
                </label>
                <select
                  className="form-select"
                  id="state"
                  required
                  name="s_year"
                  onChange={handleInputChange}
                >
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Start Year
                </label>
                <input
                  type="number"
                  min={1900}
                  max={2100}
                  step={1}
                  className="form-control"
                  id="lastName"
                  placeholder="Address"
                  required
                  name="s_year"
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="state" className="form-label">
                  End Month
                </label>
                <select
                  className="form-select"
                  id="state"
                  required
                  name="e_year"
                  onChange={handleInputChange}
                >
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  End Year
                </label>
                <input
                  type="number"
                  min={1900}
                  max={2100}
                  step={1}
                  className="form-control"
                  id="lastName"
                  placeholder="Address"
                  required
                  name="e_year"
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  About
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Address"
                  required
                  name="address"
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
        </div>
      </div>
    </div>
  );
};

export default EducationInfo;
