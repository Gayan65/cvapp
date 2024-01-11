import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";

const LanguageInfo = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [allLanguages, setAllLanguages] = useState();
  const [languageInfo, setLanguageInfo] = useState({
    user_id: "",
    l_name: "Afar",
    l_pro: "A1 - Beginner",
  });
  const [message, setMessage] = useState(null);
  //Setting database laguage data
  const [languageDataDB, setLanguageDataDB] = useState(null);

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
  };

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLanguageInfo((prevData) => ({
      ...prevData,
      [name]: value,
      user_id: token,
    }));
  };

  //Handle form create
  const handleFormCreate = async (event) => {
    event.preventDefault();
    //console.log(languageInfo);
    const data = qs.stringify(languageInfo);
    // axios call

    await axios
      .post("http://localhost:4000/api/lan/create", data, {
        headers,
      })
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data);
      });
  };

  //Handle form update
  //const handleFormUpdate = () => {};

  //Protecting route
  useEffect(() => {
    if (token === null || token === "") {
      navigate("/login");
    } else {
      //getting all languages api to get all languages
      axios.get("http://localhost:4000/api/rest_language").then((response) => {
        setAllLanguages(response.data);
      });

      axios.get("http://localhost:4000/api/lan/all").then((response) => {
        console.log(response.data);
        if (response.data) {
          console.log("Data here");
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
            <span className="text-primary">Your Language Summery</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Language</h6>
                <small className="text-body-secondary">{"Hi"}</small>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0"> Proficiency Level</h6>
                <small className="text-body-secondary">{"hi"}</small>
              </div>
            </li>
          </ul>
        </div>

        {/*Form section two */}

        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Language information here..</h4>
          <form
            className="needs-validation"
            method="POST"
            onSubmit={handleFormCreate}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="state" className="form-label">
                  Select Language
                </label>
                <select
                  className="form-select"
                  id="state"
                  required
                  name="l_name"
                  onChange={handleInputChange}
                >
                  {allLanguages ? (
                    allLanguages.map((language, i) => (
                      <option key={i}>{language.name}</option>
                    ))
                  ) : (
                    <option>{"Loading"}</option>
                  )}
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="state" className="form-label">
                  Proficiency Level
                </label>
                <select
                  className="form-select"
                  id="state"
                  required
                  name="l_pro"
                  onChange={handleInputChange}
                >
                  <option>A1 - Beginner</option>
                  <option>A2 - Elementary</option>
                  <option>B1 - Intermediate</option>
                  <option>B2 - Upper-Intermediate</option>
                  <option>C1 - Advanced</option>
                  <option>C2 - Proficient</option>
                  <option>Native</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
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

export default LanguageInfo;
