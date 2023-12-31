import React, { useState } from "react";
import axios from "axios";
import qs from "qs";

const PasswordChange = (props) => {
  //Start state of the component
  const [user, setUser] = useState({
    hash: "",
  });
  //console.log(user);

  //set state for the API response
  const [message, setMessage] = useState(null);

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
      .put(`http://localhost:4000/api/user/change_pw/${props.userId}`, userData)
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

                <button className="btn btn-danger btn" type="submit">
                  Change
                </button>
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