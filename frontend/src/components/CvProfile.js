import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CvProfile = () => {
  const [user, setUser] = useState(null);
  //getting the user params
  const { email } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/profile/find/${email}`)
      .then((response) => {
        console.log(response.data.user[0]);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching user data:", error);
      });

    // eslint-disable-next-line
  }, []);

  return <div>CvProfile</div>;
};

export default CvProfile;
