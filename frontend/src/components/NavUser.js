import React, { useState, useEffect } from "react";
import axios from "axios";

const NavUser = () => {
  //Getting token
  const token = sessionStorage.getItem("token");

  //Start state of the component
  const [fetchUser, setFetchUser] = useState({
    fname: "",
  });

  // Fetching the user data from the backend via token
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/user/find/${token}`)
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