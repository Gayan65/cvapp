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

  return (
    <div>
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
};

export default CvProfile;
