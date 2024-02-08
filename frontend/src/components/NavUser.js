import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const NavUser = () => {
  const navigate = useNavigate();
  //Getting token
  const token = sessionStorage.getItem("token");

  //Start state of the component
  const [fetchUser, setFetchUser] = useState({
    fname: "",
  });

  //Admin status
  const [admin, setAdmin] = useState(false);

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // Fetching the user data from the backend via token
  useEffect(() => {
    axios
      .get(`https://instar-resume-bakend.onrender.com/api/user/find/${token}`, {
        headers,
      })
      .then((response) => {
        setFetchUser(response.data.user[0]);
        //setting admin for admin function
        if (response.data.user[0].admin) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      })
      .catch((error) => {
        // Handle errors
        //once the token expires user redirect to the Error page
        if (error.response.status === 403) navigate("/login");
        else console.error("Error fetching user data:", error);
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
      <ul className="dropdown-menu custom-drop-down">
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
        {admin && (
          <li>
            <a className="dropdown-item" href={`/admin_function`}>
              Admin Function
            </a>
          </li>
        )}
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
