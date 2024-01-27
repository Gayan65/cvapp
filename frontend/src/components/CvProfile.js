import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import profileImg from "../images/profile/profile.png";

const CvProfile = () => {
  const [user, setUser] = useState(null);
  const [personal, setPersonal] = useState(null);
  const [tempImg, setTempImg] = useState(false);
  const [contact, setContact] = useState(null);
  //getting the user params
  const { email } = useParams();
  const currentUrl = window.location.href;
  console.log(currentUrl);

  useEffect(() => {
    //Getting user Dtls
    axios
      .get(`http://localhost:4000/api/profile/user/find/${email}`)
      .then((response) => {
        setUser(response.data.user[0]);

        //Getting personal dtls
        axios
          .get(
            `http://localhost:4000/api/profile/personal/find/${response.data.user[0].user_id}`
          )
          .then((personal_response) => {
            setPersonal(personal_response.data.personal[0]);
          })
          .catch((error) => {
            setTempImg(true);
          });

        axios
          .get(
            `http://localhost:4000/api/profile/contact/find/${response.data.user[0].user_id}`
          )
          .then((contact_response) => {
            console.log(contact_response.data.contact[0]);
            setContact(contact_response.data.contact[0]);
          })
          .catch((error) => {
            // Handle errors
            //console.error("Error fetching user data:", error);
            //setNoData(true);
          });
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching user data:", error);
      });

    // eslint-disable-next-line
  }, []);

  if (user) {
    return (
      <div className="container mt-4 ">
        {/* Start Raw image Moto, Description */}
        <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary row custom-border-cv">
          <div className="col-lg-3 p-3 custom-border-cv-head">
            {personal ? (
              <div className="">
                {tempImg === true ||
                tempImg === null ||
                personal.image === null ? (
                  <img
                    src={profileImg}
                    className="img-fluid mb-3 img-custom"
                    alt="profile"
                  />
                ) : (
                  <img
                    src={`data:image/png;base64,${personal.image}`}
                    className="img-fluid mb-3 img-custom"
                    alt="profile"
                  />
                )}
              </div>
            ) : null}
          </div>
          <div className="col-lg-9 p-3 custom-border-cv-head">
            <h1 className="custom-cv-font-color-name fw-bold ">
              {user.fname} {user.lname}
            </h1>
            <p className="lead my-3 custom-cv-font-color-moto">
              {personal ? personal.moto : null}
            </p>
            <p className="lead my-3 custom-cv-font-color-description">
              {personal ? personal.description : null}
            </p>
          </div>
          {/* End Raw image Moto, Description */}
          {/* Start contact infor bar */}
          <div className="container">
            <div className="row justify-content-center">
              <div className="col custom-border mt-3 p-2 d-flex justify-content-between align-items-center">
                <div>
                  Address
                  {contact && (
                    <span>
                      {contact.address_lane}, {contact.city}, {contact.country},{" "}
                      {contact.post_code}
                    </span>
                  )}
                </div>
                <div>
                  Contact Mobile
                  {contact && (
                    <span>
                      {contact.m_code} - {contact.m_number}
                    </span>
                  )}
                </div>
                <div>
                  Contact Whatsapp
                  {contact && (
                    <span>
                      {contact.w_code} - {contact.w_number}
                    </span>
                  )}
                </div>
                <div>Email {user && <span>{user.email}</span>}</div>
              </div>
            </div>
          </div>
          {/* End contact infor bar */}
          {/* Start Work experience */}
          <div className="container custom-border mt-3 p-2">
            Work Experience
            <div className="container custom-border">
              <div className="row justify-content-center">
                <div className="col custom-border mt-3 p-2 d-flex justify-content-between align-items-center">
                  <div>Institution</div>
                  <div>Position</div>
                  <div>Start</div>
                  <div>End</div>
                </div>
                <div className="custom-border mt-3 p-2">Task</div>
              </div>
            </div>
          </div>
          {/* End Work experience */}
          {/* Start Education */}
          <div className="container custom-border mt-3 p-2">
            Education
            <div className="container custom-border">
              <div className="row justify-content-center">
                <div className="col custom-border mt-3 p-2 d-flex justify-content-between align-items-center">
                  <div>Institution</div>
                  <div>Program</div>
                  <div>Name of Major</div>
                  <div>Start</div>
                  <div>End</div>
                </div>
                <div className="custom-border mt-3 p-2">Content Covered</div>
              </div>
            </div>
          </div>
          {/* End Education */}
          {/* Start Language */}
          <div className="container custom-border mt-3 p-2">
            Languages
            <div className="container custom-border">
              <div className="row justify-content-center">
                <div className="col custom-border mt-3 p-2 d-flex justify-content-between align-items-center">
                  <div>Language</div>
                  <div>Proficiency </div>
                </div>
                <div className="custom-border mt-3 p-2">Any Comments</div>
              </div>
            </div>
          </div>
          {/* End Language */}
          {/* Start Other */}
          <div className="container custom-border mt-3 p-2">
            Other
            <div className="container custom-border">
              <div className="row justify-content-center">
                <div className="custom-border mt-3 p-2">Topic</div>
                <div className="custom-border mt-3 p-2">Content</div>
              </div>
            </div>
          </div>
          {/* End Other */}
        </div>
        {/* Start Raw image Moto, Description */}
        <div>CvProfile {user ? user.fname : "No data"}</div>
        <div>URL {user ? currentUrl : "No data"}</div>
        <div>
          <p>Scan Me</p>
          <div>
            {user ? <QRCodeSVG value={currentUrl} size={256} /> : "No data"}
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="container mt-4 ">No Data to display</div>;
  }
};

export default CvProfile;
