import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import Model from "../Model";

const Admin = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  // Setting users
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState();

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  //Handle Delete
  const handleDelete = async (user_id) => {
    //Error handles of being deleting value become undefined
    if (user_id === undefined || user_id === null) {
      window.location.reload();
    } else {
      await axios
        .delete(`http://localhost:4000/api/user/delete/${user_id}`, {
          headers,
        })
        .then((response) => {
          setMessage(response.data.message);
        })
        .catch((error) => {
          // Handle errors
          //once the token expires user redirect to the Error page
          if (error.response.status === 403) navigate("/login");
          else console.error("Error fetching user data:", error);
        });
    }
  };

  //Checking user has logged
  useEffect(() => {
    if (token === "" || token === null) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:4000/api/user/find/${token}`, { headers })
        .then((response) => {
          const user = response.data.user[0];
          if (user.admin) {
            axios
              .get(`http://localhost:4000/api/user/all`, { headers })
              .then((response) => {
                setUsers(response.data);
              })
              .catch((error) => {
                // Handle errors
                //once the token expires user redirect to the Error page
                if (error.response.status === 403) navigate("/login");
                else console.error("Error fetching user data:", error);
              });
          } else {
            navigate("/login");
          }
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
        <div className="list-group">
          {users &&
            users.map((user, i) => (
              <div
                className="list-group-item list-group-item-action d-flex gap-3 py-3"
                aria-current="true"
                key={i}
              >
                <div className="d-flex gap-2 w-100 justify-content-between">
                  <div>
                    <h6 className="mb-0">{user.email}</h6>
                    <p className="mb-0 opacity-75">
                      {user.fname}, {user.lname}
                    </p>
                  </div>
                  <small className="opacity-50 text-nowrap">
                    {user.admin == false && (
                      <button
                        className=" btn btn-danger"
                        onClick={() => handleDelete(user.user_id)}
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </small>
                </div>
              </div>
            ))}
        </div>
        <Model
          title={"Language information"}
          message={message ? message : "No message"}
        />
      </div>
    </div>
  );
};

export default Admin;
