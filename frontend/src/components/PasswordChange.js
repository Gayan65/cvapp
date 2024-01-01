import React, { useState } from "react";
import axios from "axios";
import qs from "qs";

const PasswordChange = (props) => {
  //Start state of the component
  const [user, setUser] = useState({
    hash: "",
  });

  //set state for the API response
  const [message, setMessage] = useState(null);

  //Getting token
  const token = sessionStorage.getItem("token");

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  //Handling inputs
  const handlePaaswordInputChange = (event) => {
    const { name, value } = event.target;
    setUser((pastData) => ({
      ...pastData,
      [name]: value,
    }));
  };

  // Handling form submit
  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    const userData = qs.stringify(user);
    await axios
      .put(
        `http://localhost:4000/api/user/change_pw/${props.userId}`,
        userData,
        { headers }
      )
      .then((response) => {
        setMessage(response.data.message);
      });
  };

  return (
    <div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Change password
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <form
                className="needs-validation"
                onSubmit={handlePasswordSubmit}
              >
                <div className="row g-3 mb-3 ">
                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={handlePaaswordInputChange}
                    />
                    <div className="invalid-feedback">
                      Valid password required
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-danger btn"
                  type="submit"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Change
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Password Change Status
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Password successfully Changed !
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Okay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              {message && (
                <div className="alert alert-primary mt-3" role="alert">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
