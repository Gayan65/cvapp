import React, { useEffect, useState } from "react";
import axios from "axios";

const CvProfile = () => {
  const [personal, setPersonal] = useState(null);
  //protecting this route
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/personal/find/email`)
      .then((response) => {
        setPersonal(response.data.personal[0]);
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
