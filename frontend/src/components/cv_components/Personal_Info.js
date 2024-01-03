import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const Personal_Info = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  //protecting this route
  useEffect(() => {
    if(token === null || token ==="") {
      navigate('/login')
    }
    else{
      console.log("You are good to go!")
    }
    // eslint-disable-next-line
  }, [])
  return <div>Personal_Info</div>;
};

export default Personal_Info;
