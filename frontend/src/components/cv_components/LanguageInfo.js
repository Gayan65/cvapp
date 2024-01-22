import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import Model from "../Model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";

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

  //Handle Delete
  const handleDelete = (event) => {
    const lan_id = event.target.value;
    axios
      .delete(`http://localhost:4000/api/lan/delete/${lan_id}`, {
        headers,
      })
      .then((response) => {
        setMessage(response.data.message);
      });
  };

  //Handle form create
  const handleFormCreate = async (event) => {
    event.preventDefault();
    const data = qs.stringify(languageInfo);
    // axios call

    await axios
      .post("http://localhost:4000/api/lan/create", data, {
        headers,
      })
      .then((response) => {
        setMessage(response.data.message);
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
      axios
        .get("http://localhost:4000/api/rest_language", {
          headers,
        })
        .then((response) => {
          setAllLanguages(response.data);
        });
      //Getting language information fro the DB
      axios
        .get(`http://localhost:4000/api/lan/user/${token}`, {
          headers,
        })
        .then((response) => {
          if (response.data.success) {
            setLanguageDataDB(response.data.languages);
          } else {
            console.log("No data");
          }
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
            <span className=" font-custom-color">Your Language Summery</span>
          </h4>
          <ul className="list-group mb-3">
            {languageDataDB ? (
              languageDataDB.map((language, i) => (
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
                    onClick={handleDelete}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
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
          <h4 className="mb-3 font-custom-color">
            Language information here..
          </h4>
          <form
            className="needs-validation"
            method="POST"
            onSubmit={handleFormCreate}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="state" className="form-label font-custom-color">
                  Select Language
                </label>
                <select
                  className="form-select form-control custom-login-input"
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
                <label htmlFor="state" className="form-label font-custom-color">
                  Proficiency Level
                </label>
                <select
                  className="form-select custom-login-input form-control"
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

            <button
              className="btn btn-primary mt-3 "
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <FontAwesomeIcon icon={faPlus} /> Add
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

export default LanguageInfo;
