import React, { useState, useEffect } from "react";
import navLogo from "../images/logos/Logo.png";
import NavUser from "./NavUser";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check session storage for the user
    const token = sessionStorage.getItem("token");

    // Update the state based on whether the user exists
    setIsLoggedIn(!!token);
  }, []); // The empty dependency array ensures this effect runs only once on mount

  console.log("Is User Logged In:", isLoggedIn);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand mb-2" href="/">
            <img src={navLogo} alt="Bootstrap" width="150" height="20" />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Product
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Search People
                </a>
              </li>
            </ul>

            {isLoggedIn === false ? (
              <a className="btn btn-outline-secondary" href="/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-fill-check me-2 "
                  viewBox="0 0 16 16"
                >
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                </svg>
                Login
              </a>
            ) : (
              <NavUser />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
