import React, { useState } from "react";
import logoImg from "../../images/logos/LogoSmall.png";

const Profile = () => {
  const userFromSession = sessionStorage.getItem("user");
  const user = JSON.parse(userFromSession);

  const [inputData, setInputData] = useState({
    fname: user.fname,
    lname: user.lname,
  });

  //Handling inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handling form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputData);
  };
  return (
    <div className=" container ">
      <div className="py-5 text-center">
        <img
          className="d-block mx-auto mb-4"
          src={logoImg}
          alt="Logo"
          width="72"
          height="72"
        />
        <h2>User Profile</h2>
        <p className="lead">
          This profile page is a dedicated space that provides a personalized
          and customizable view of own information and typically serves as a
          central hub for to manage your account settings within this platform.
        </p>
      </div>
      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your Profile Settings</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm p-3">
              <div>
                <h6 className="my-0">Email Address</h6>
              </div>
              <span className="text-body-secondary">{user.email}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm p-3">
              <div>
                <h6 className="my-0">First Name</h6>
              </div>
              <span className="text-body-secondary">{user.fname}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm p-3">
              <div>
                <h6 className="my-0">Last Name</h6>
              </div>
              <span className="text-body-secondary">{user.lname}</span>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Edit Your Profile</h4>

          <form className="needs-validation" onSubmit={handleSubmit}>
            <div className="row g-3 mb-3 ">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="fname"
                  onChange={handleInputChange}
                  value={inputData.fname}
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lname"
                  onChange={handleInputChange}
                  value={inputData.lname}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
