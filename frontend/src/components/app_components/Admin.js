import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  // Setting users
  const [users, setUsers] = useState([]);

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  //Checking user has logged
  useEffect(() => {
    if (token === "" || token === null) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:4000/api/user/all`, { headers })
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        })
        .catch((error) => {
          // Handle errors
          //once the token expires user redirect to the Error page
          if (error.response.status === 403) navigate("/login");
          else console.error("Error fetching user data:", error);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <main className="form-signin w-100 m-auto custom-border-login">
          {users.map((user, i) => (
            <div key={i} className=" fs-2 p-3 me-4">
              {user.email} <button className=" btn btn-danger ">Delete</button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Admin;
