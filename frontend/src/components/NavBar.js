import React from "react";
import navLogo from "../images/logos/Logo.png";

const NavBar = () => {
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

            <button className="btn btn-outline-secondary" type="Login">
              Search
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
