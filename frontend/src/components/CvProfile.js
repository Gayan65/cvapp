import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import profileImg from "../images/profile/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const CvProfile = () => {
  const [user, setUser] = useState(null);
  const [personal, setPersonal] = useState(null);
  const [tempImg, setTempImg] = useState(false);
  const [contact, setContact] = useState(null);
  const [exp, setExp] = useState(null);
  const [edu, setEdu] = useState(null);
  const [lan, setLan] = useState(null);
  const [other, setOther] = useState(null);

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
        //Getting contact dtls
        axios
          .get(
            `http://localhost:4000/api/profile/contact/find/${response.data.user[0].user_id}`
          )
          .then((contact_response) => {
            setContact(contact_response.data.contact[0]);
          })
          .catch((error) => {
            //console.error("Error fetching user data:", error);
          });
        //Getting Work exp dtls
        axios
          .get(
            `http://localhost:4000/api/profile/exp/find/${response.data.user[0].user_id}`
          )
          .then((exp_response) => {
            setExp(exp_response.data.exp);
          })
          .catch((error) => {
            //console.error("Error fetching user data:", error);
          });

        //Getting Education dtls
        axios
          .get(
            `http://localhost:4000/api/profile/edu/find/${response.data.user[0].user_id}`
          )
          .then((edu_response) => {
            setEdu(edu_response.data.edu);
          })
          .catch((error) => {
            //console.error("Error fetching user data:", error);
          });

        //Getting Language dtls
        axios
          .get(
            `http://localhost:4000/api/profile/lan/find/${response.data.user[0].user_id}`
          )
          .then((lan_response) => {
            console.log(lan_response.data.lan);
            setLan(lan_response.data.lan);
          })
          .catch((error) => {
            //console.error("Error fetching user data:", error);
          });

        //Getting Other dtls
        axios
          .get(
            `http://localhost:4000/api/profile/other/find/${response.data.user[0].user_id}`
          )
          .then((other_response) => {
            console.log(other_response.data.other);
            setOther(other_response.data.other);
          })
          .catch((error) => {
            //console.error("Error fetching user data:", error);
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
              <div className="col p-2 d-flex justify-content-between align-items-center custom-contact-info px-5 ">
                <div>
                  <FontAwesomeIcon icon={faLocationDot} />
                  {contact && (
                    <span className="ms-1">
                      {contact.address_lane}, {contact.city}, {contact.country},{" "}
                      {contact.post_code}
                    </span>
                  )}
                </div>
                <div>
                  <FontAwesomeIcon icon={faPhone} />
                  {contact && (
                    <span className="ms-1">
                      {contact.m_code} - {contact.m_number}
                    </span>
                  )}
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-whatsapp mb-1 "
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                  </svg>
                  {contact && (
                    <span className="ms-1">
                      {contact.w_code} - {contact.w_number}
                    </span>
                  )}
                </div>
                <div>
                  <FontAwesomeIcon icon={faEnvelope} />{" "}
                  {user && <span className="ms-1">{user.email}</span>}
                </div>
              </div>
            </div>
          </div>
          {/* End contact infor bar */}
          {/* Start Work experience */}
          <div className="container mt-3 p-2">
            <span className="sub-heading-cv">WORK EXPERIENCE</span>
            {exp &&
              exp.map((work, i) => (
                <div className="container" key={i}>
                  <div className="row justify-content-center">
                    <div className="col  mt-3 p-2 d-flex justify-content-between align-items-center">
                      <div className="custom-inner-heading">
                        {work.position}
                      </div>
                      <div className="custom-inner-item">
                        {work.employer}, {work.address}
                      </div>
                      <div className="custom-inner-item">
                        {work.s_month}/{work.s_year} - {work.e_month}/
                        {work.e_year}
                      </div>
                    </div>
                    <div className="p-2 custom-inner-item">{work.task}</div>
                  </div>
                </div>
              ))}
          </div>
          {/* End Work experience */}
          {/* Start Education */}
          <div className="container mt-3 p-2">
            <span className="sub-heading-cv">EDUCATION</span>
            {edu &&
              edu.map((education, i) => (
                <div className="container" key={i}>
                  <div className="row justify-content-center">
                    <div className="col mt-3 p-2 d-flex justify-content-between align-items-center">
                      <div className="custom-inner-heading">
                        {education.program} in {education.program_name}
                      </div>
                      <div className="custom-inner-item">
                        {education.institution}, {education.address}
                      </div>
                      <div className="custom-inner-item">
                        {education.s_month}/{education.s_year} -{" "}
                        {education.e_month}/{education.e_year}
                      </div>
                    </div>
                    <div className="p-2 custom-inner-item">
                      {education.about}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* End Education */}
          {/* Start Language */}
          <div className="container mt-3 p-2">
            <span className="sub-heading-cv">LANGUAGE</span>
            {lan &&
              lan.map((language, i) => (
                <div className="container" key={i}>
                  <div className="row justify-content-center">
                    <div className=" mt-3 p-2 custom-inner-heading">
                      {language.l_name}
                    </div>
                    <div className=" p-2 custom-inner-item">
                      {language.l_pro}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* End Language */}
          {/* Start Other */}
          {other &&
            other.map((item, i) => (
              <div className="container mt-3 p-2" key={i}>
                <span className="sub-heading-cv">{item.topic}</span>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="p-2 custom-inner-item">{item.content}</div>
                  </div>
                </div>
              </div>
            ))}
          {/* End Other */}
        </div>
        {/* End CV */}

        {/*-------------- Bottom part start -----------------*/}
        <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary row">
          <div className="col-lg-3 p-3">
            <div>
              <p className=" fs-3 ">Scan Me</p>
              <div>
                {user ? <QRCodeSVG value={currentUrl} size={256} /> : "No data"}
              </div>
            </div>
          </div>
          <div className="col-lg-9 p-3">
            <p className=" fs-3 ">Here is my link</p>
            <h1 className=" fw-bold ">URL {user ? currentUrl : "No data"}</h1>
          </div>
        </div>
        {/*-------------- Bottom part end -----------------*/}
      </div>
    );
  } else {
    return <div className="container mt-4 ">No Data to display</div>;
  }
};

export default CvProfile;
