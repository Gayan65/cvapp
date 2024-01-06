import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact_Info = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [mcCode, setMcCode] = useState("");

  //protecting this route
  useEffect(() => {
    if (token === null || token === "") {
      navigate("/login");
    } else {
      //Getting all country codes
      axios
        .get(
          "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json"
        )
        .then((response) => {
          setMcCode(response.data);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className=" container ">
      <div className="py-5 text-center">
        <h1 className="text-center mb-5 fs-3 custom-component-heading">
          Contact Information Section
        </h1>
      </div>

      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your contact summery</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Mobile Number</h6>
                <small className="text-body-secondary">Brief description</small>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Whatsapp Number</h6>
                <small className="text-body-secondary">Brief description</small>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Address</h6>
                <small className="text-body-secondary">Brief description</small>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Postcode, City</h6>
                <small className="text-body-secondary">Brief description</small>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Country</h6>
                <small className="text-body-secondary">Brief description</small>
              </div>
            </li>
          </ul>
        </div>

        {/*Form section two */}

        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Contact information here..</h4>
          <form className="needs-validation" noValidate="">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="state" className="form-label">
                  Mobile Country code
                </label>
                <select className="form-select" id="state" required>
                  {mcCode ? (
                    mcCode.map((country, i) => (
                      <option key={i}>
                        {country.dial_code}, {country.name}
                      </option>
                    ))
                  ) : (
                    <option>Loading</option>
                  )}
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>

              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  required=""
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="state" className="form-label">
                  Whatsapp Country code
                </label>
                <select className="form-select" id="state" required="">
                  {mcCode ? (
                    mcCode.map((country, i) => (
                      <option key={i}>
                        {country.dial_code}, {country.name}
                      </option>
                    ))
                  ) : (
                    <option>Loading</option>
                  )}
                </select>
                <div className="invalid-feedback">
                  Please provide a valid Whatsapp Country code.
                </div>
              </div>

              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Whatsapp Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  required=""
                />
                <div className="invalid-feedback">
                  Valid Whatsapp Number is required.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address Lane
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required=""
                />
                <div className="invalid-feedback">
                  Please enter your address lane.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  required=""
                />
                <div className="invalid-feedback">Please enter your City.</div>
              </div>

              <div className="col-md-7">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select className="form-select" id="country" required="">
                  <option>United States</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>

              <div className="col-md-5">
                <label htmlFor="zip" className="form-label">
                  Postcode
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  required=""
                />
                <div className="invalid-feedback">Postcode required.</div>
              </div>
            </div>

            <button className="btn btn-primary mt-3 " type="submit">
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact_Info;
