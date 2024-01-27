import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

const CvProfile = () => {
  const [user, setUser] = useState(null);
  //getting the user params
  const { email } = useParams();
  const currentUrl = window.location.href;
  console.log(currentUrl);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/profile/find/${email}`)
      .then((response) => {
        console.log(response.data.user[0].fname);
        setUser(response.data.user[0]);
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
        <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary row custom-border">
          <div className="col-lg-3 p-2 custom-border">img</div>
          <div className="col-lg-9 custom-border p-2 ">
            <h1 className="">
              Title of a longer featured blog post (full name)
            </h1>
            <p className="lead my-3">
              Multiple lines of text that form the lede, informing new readers
              (Moto)
            </p>
            <p className="lead my-3">
              Multiple lines of text that form the lede, informing new readers
              quickly and efficiently about what’s most interesting in this
              post’s contents. Multiple lines of text that form the lede,
              informing new readers quickly and efficiently about what’s most
              interesting in this post’s contents (Description)
            </p>
          </div>
          {/* End Raw image Moto, Description */}
          {/* Start contact infor bar */}
          <div className="container">
            <div className="row justify-content-center">
              <div className="col custom-border mt-3 p-2 d-flex justify-content-between align-items-center">
                <div>Address</div>
                <div>Contact Mobile</div>
                <div>Contact Whatsapp</div>
                <div>Email</div>
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
