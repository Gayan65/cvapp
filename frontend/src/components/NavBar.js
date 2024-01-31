import React, { useState, useEffect } from "react";
import NavUser from "./NavUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMicrochip,
  faBuilding,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

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
        <div className="container ">
          <a className="navbar-brand me-5" href="/">
            <span className="custom-nav-logo-instar fw-bold ">instar</span>
            <span className="custom-nav-logo-resume fw-bold ">Resume</span>
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
            <span className="custom-nav-toggler-icon">
              <FontAwesomeIcon icon={faBars} />
            </span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link mx-3 " href="/home">
                  <FontAwesomeIcon icon={faHouse} />
                  <span className="ms-1">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-3  " href="/">
                  <FontAwesomeIcon icon={faBuilding} />
                  <span className="ms-1">About Us</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-3 " href="/">
                  <FontAwesomeIcon icon={faMicrochip} />
                  <span className="ms-1">Product</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-3  " href="/search">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <span className="ms-1">Search</span>
                </a>
              </li>
            </ul>
          </div>
          {isLoggedIn === false ? (
            <a className="btn btn-primary" href="/login">
              <span className=" px-3 ">Login</span>
            </a>
          ) : (
            <NavUser />
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
