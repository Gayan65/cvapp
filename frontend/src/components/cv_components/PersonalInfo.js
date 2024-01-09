import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import profileImg from "../../images/profile/profile.png";
import Model from "../Model";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [fetchPersonal, setFetchPersonal] = useState({
    user_id: "",
    moto: "",
    description: "",
    image: "",
  });
  const [message, setMessage] = useState(null);
  //When loads the component Temporary image is false
  const [tempImg, setTempImg] = useState(false);
  //When personal data not exists
  const [noData, setNoData] = useState(false);

  //Making the form data in a relevent manner for the sending as payload
  const formData = new FormData();
  formData.append("moto", fetchPersonal.moto);
  formData.append("description", fetchPersonal.description);
  formData.append("image", fetchPersonal.image); // Assuming fetchPersonal.image is a file object

  //Making the header
  const headers = {
    Authorization: `bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };

  // Handling input change for moto
  const handleMotoChange = (event) => {
    const { value } = event.target;
    setFetchPersonal((prevData) => ({
      ...prevData,
      moto: value,
    }));
  };

  // Handling input change for description
  const handleDescriptionChange = (event) => {
    const { value } = event.target;
    setFetchPersonal((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  // Handling input change for image file
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Assuming you only allow a single file
    setFetchPersonal((prevData) => ({
      ...prevData,
      image: file,
    }));
    //Setting temporary Image for profile
    setTempImg(true);
  };

  //Submit data (For Update function)
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:4000/api/personal/update/${token}`, formData, {
        headers,
      })
      .then((response) => {
        setMessage(response.data.message);
        //window.location.reload();
      });
  };

  //Submit data (For Create function)
  const handleCreate = (event) => {
    event.preventDefault();
    //Getting token to the form data
    formData.append("user_token", token);
    axios
      .post("http://localhost:4000/api/personal/create", formData, {
        headers,
      })
      .then((response) => {
        setMessage(response.data.message);
      });
  };

  //Handling Back navigation
  const handdleBack = () => {
    navigate("/home");
  };

  //protecting this route
  useEffect(() => {
    if (token === null || token === "") {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:4000/api/personal/find/${token}`, { headers })
        .then((response) => {
          setFetchPersonal(response.data.personal[0]);
        })
        .catch((error) => {
          // Handle errors
          //console.error("Error fetching user data:", error);
          setTempImg(true);
          setNoData(true);
        });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className=" container mt-3 ">
      <div className="row">
        <h1 className="text-center mb-5 fs-3 custom-component-heading">
          Personal Information section
        </h1>

        {/* Renders the profile info */}

        <div className="mb-3" style={{ maxWidth: "800px" }}>
          <div className="row g-0">
            <div className="col-md-4 me-5">
              {tempImg === true ||
              tempImg === null ||
              fetchPersonal.image === null ? (
                <img
                  src={profileImg}
                  className="img-fluid mb-3 img-custom"
                  alt="profile"
                />
              ) : (
                <img
                  src={`data:image/png;base64,${fetchPersonal.image}`}
                  className="img-fluid mb-3 img-custom"
                  alt="profile"
                />
              )}
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h5 className="card-title mb-3 fw-semibold ">
                  {fetchPersonal.moto}
                </h5>
                <p className="card-text fst-italic mb-3 ">
                  {fetchPersonal.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Renders the profile info end */}

        {/*Add Form for moto, description, image, user_id will be send as the token and decorded in the server end */}
        <div>
          <form method="POST" onSubmit={noData ? handleCreate : handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Add your moto here...
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={handleMotoChange}
                value={fetchPersonal.moto}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                The best way to describe about you..
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                onChange={handleDescriptionChange}
                value={fetchPersonal.description}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Add your profile image..
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={handleFileChange}
              />
              <button
                className=" btn btn-primary mt-3 "
                type="submit"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Save
              </button>
            </div>
          </form>
          <Model
            title={"Personal information"}
            message={
              message
                ? message
                : "Fetching Data unsuccessful!, recheck your fields."
            }
          />
        </div>
        {/* form end */}
      </div>
      <button className=" btn btn-success mt-2 " onClick={handdleBack}>
        Back
      </button>
    </div>
  );
};

export default PersonalInfo;
