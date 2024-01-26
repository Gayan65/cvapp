import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavUser = () => {
  //Getting token
  const token = sessionStorage.getItem("token");

  //Start state of the component
  const [fetchUser, setFetchUser] = useState({
    fname: "",
  });

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // Fetching the user data from the backend via token
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/user/find/${token}`, { headers })
      .then((response) => {
        setFetchUser(response.data.user[0]);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching user data:", error);
      });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <FontAwesomeIcon icon={faUser} />
        <span className=" ms-2 ">{fetchUser.fname}</span>
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="/profile">
            profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/home">
            Home
          </a>
        </li>
        <li>
          <a className="dropdown-item" href={`/cv_profile/${fetchUser.email}`}>
            My resume
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/login">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavUser;
