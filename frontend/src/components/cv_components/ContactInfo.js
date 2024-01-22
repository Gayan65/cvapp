import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import Model from "../Model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ContactInfo = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [mcCode, setMcCode] = useState("");
  const [fetchContact, setFetchContact] = useState({
    user_id: "",
    m_code: "+93",
    m_number: "",
    w_code: "+93",
    w_number: "",
    address_lane: "",
    city: "",
    post_code: "",
    country: "Afghanistan",
  });
  //When contact data not exists
  const [noData, setNoData] = useState(false);
  const [message, setMessage] = useState(null);

  //Handling inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFetchContact((prevData) => ({
      ...prevData,
      [name]: value,
      user_id: token,
    }));
  };

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
  };

  // Handle Form create
  const handleFormCreate = async (event) => {
    event.preventDefault();
    console.log("Submitted");
    console.log(fetchContact);
    const data = qs.stringify(fetchContact);
    // axios call
    await axios
      .post("http://localhost:4000/api/contact/create", data, {
        headers,
      })
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data);
      });
  };

  // Handle Form update
  const handleFormUpdate = async (event) => {
    event.preventDefault();
    // console.log("Updated");

    //console.log(fetchContact);
    const data = qs.stringify(fetchContact);
    // axios call
    await axios
      .put("http://localhost:4000/api/contact/update", data, {
        headers,
      })
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data);
      });
  };

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

      //Getting existing contact information
      axios
        .get(`http://localhost:4000/api/contact/find/${token}`, { headers })
        .then((response) => {
          console.log(response.data.contact[0]);
          setFetchContact(response.data.contact[0]);
        })
        .catch((error) => {
          // Handle errors
          //console.error("Error fetching user data:", error);
          setNoData(true);
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
            <span className="font-custom-color">Summery</span>
          </h4>
          <ul className="list-group mb-3 custom-border-contact">
            <li className="list-group-item d-flex justify-content-between lh-sm font-custom-color">
              <div>
                <h6 className="my-0">Mobile Number</h6>
                <small className="">
                  {fetchContact.m_code} {fetchContact.m_number}
                </small>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm font-custom-color">
              <div>
                <h6 className="my-0">Whatsapp Number</h6>
                <small className="text-body-secondary font-custom-color">
                  {fetchContact.w_code} {fetchContact.w_number}
                </small>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm font-custom-color">
              <div>
                <h6 className="my-0">Address</h6>
                <small className="text-body-secondary font-custom-color">
                  {fetchContact.address_lane}
                </small>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm font-custom-color">
              <div>
                <h6 className="my-0">Postcode, City</h6>
                <small className="text-body-secondary font-custom-color">
                  {fetchContact.post_code} {fetchContact.city}
                </small>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm font-custom-color">
              <div>
                <h6 className="my-0">Country</h6>
                <small className="text-body-secondary font-custom-color">
                  {fetchContact.country}
                </small>
              </div>
            </li>
          </ul>
        </div>

        {/*Form section two */}

        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3 font-custom-color">Add here..</h4>
          <form
            className="needs-validation"
            method="POST"
            onSubmit={noData ? handleFormCreate : handleFormUpdate}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="state" className="form-label">
                  <span className=" ms-2 font-custom-color">
                    Mobile Country code
                  </span>
                </label>
                <select
                  className="form-select form-control custom-login-input"
                  id="state"
                  required
                  name="m_code"
                  onChange={handleInputChange}
                  value={fetchContact.m_code}
                >
                  {mcCode ? (
                    mcCode.map((country, i) => (
                      <option key={i} value={country.dial_code}>
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
                  <span className=" ms-2 font-custom-color">Mobile Number</span>
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="lastName"
                  placeholder="123456789"
                  required
                  name="m_number"
                  onChange={handleInputChange}
                  pattern="\d{9}"
                  value={fetchContact.m_number}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="state" className="form-label">
                  <span className=" ms-2 font-custom-color">
                    Whatsapp Country code
                  </span>
                </label>
                <select
                  className="form-select form-control custom-login-input"
                  id="state"
                  required
                  name="w_code"
                  onChange={handleInputChange}
                  value={fetchContact.w_code}
                >
                  {mcCode ? (
                    mcCode.map((country, i) => (
                      <option key={i} value={country.dial_code}>
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
                  <span className=" ms-2 font-custom-color">
                    Whatsapp Number
                  </span>
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="lastName"
                  placeholder="123456789"
                  required
                  name="w_number"
                  onChange={handleInputChange}
                  pattern="\d{9}"
                  value={fetchContact.w_number}
                />
                <div className="invalid-feedback">
                  Valid Whatsapp Number is required.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  <span className=" ms-2 font-custom-color">Address Lane</span>
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="address"
                  placeholder="1234 Main St"
                  required
                  name="address_lane"
                  onChange={handleInputChange}
                  value={fetchContact.address_lane}
                />
                <div className="invalid-feedback">
                  Please enter your address lane.
                </div>
              </div>

              <div className="col-12">
                <label
                  htmlFor="address"
                  className="form-label font-custom-color"
                >
                  City
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="address"
                  placeholder="City"
                  required
                  name="city"
                  onChange={handleInputChange}
                  value={fetchContact.city}
                />
                <div className="invalid-feedback">Please enter your City.</div>
              </div>

              <div className="col-md-7">
                <label
                  htmlFor="country"
                  className="form-label font-custom-color"
                >
                  Country
                </label>
                <select
                  className="form-select form-control custom-login-input"
                  id="country"
                  required
                  name="country"
                  onChange={handleInputChange}
                  value={fetchContact.country}
                >
                  {mcCode ? (
                    mcCode.map((country, i) => (
                      <option key={i} value={country.name}>
                        {country.name}
                      </option>
                    ))
                  ) : (
                    <option>Loading</option>
                  )}
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>

              <div className="col-md-5">
                <label htmlFor="zip" className="form-label font-custom-color">
                  Postcode
                </label>
                <input
                  type="text"
                  className="form-control custom-login-input"
                  id="zip"
                  placeholder=""
                  required
                  name="post_code"
                  onChange={handleInputChange}
                  value={fetchContact.post_code}
                />
                <div className="invalid-feedback">Postcode required.</div>
              </div>
            </div>

            <button
              className="btn btn-primary mt-3 "
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <FontAwesomeIcon icon={faFloppyDisk} />{" "}
              <span className="ms-1">Save</span>
            </button>
          </form>
          <a href="/home" className=" btn btn-outline-secondary mt-3 ">
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="ms-1">Back</span>
          </a>
          <Model
            title={"Contact information"}
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

export default ContactInfo;
