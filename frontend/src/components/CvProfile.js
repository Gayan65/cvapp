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
        <div class="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary row custom-border">
          <div class="col-lg-4 px-0 custom-border"></div>
          <div className="col-lg-8 custom-border">
            <h1 class="fst-italic">Title of a longer featured blog post</h1>
            <p class="lead my-3">
              Multiple lines of text that form the lede, informing new readers
              quickly and efficiently about what’s most interesting in this
              post’s contents.
            </p>
          </div>
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
