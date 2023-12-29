import React from "react";

const NavUser = () => {
  const userFromSession = sessionStorage.getItem("user");
  const user = JSON.parse(userFromSession);
  console.log(user.user_id);
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {user.fname}
      </button>
      <ul className="dropdown-menu">
        <li>
          <a className="dropdown-item" href="/profile">
            profile
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Another action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
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
