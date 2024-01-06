import React, { useState, useEffect } from "react";
import axios from "axios";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person-circle me-2 mb-1"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
        {fetchUser.fname}
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="/profile">
            profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/home">
            Another action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/home">
            Something else here
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
