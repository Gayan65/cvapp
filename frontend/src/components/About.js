import React from "react";
import loginLogo from "../images/logos/LogoSmall.png";

const About = () => {
  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2 className="fs-1">About Us:</h2>
        <p className="lead fw-semibold lh-lg ">
          Welcome to Instar Resume, where we empower students and professionals
          to create compelling resumes effortlessly. Our journey began with a
          simple idea: make resume building seamless, interactive, and
          enjoyable. As university students ourselves, we understand the
          importance of a standout resume in today's competitive job market.
        </p>
        <h3 className="fs-2 mt-5">Our Mission:</h3>
        <p className="lead fw-normal lh-base">
          At Instar Resume, our mission is to provide a user-friendly platform
          that transforms the resume-building process into a personalized and
          engaging experience. We believe everyone deserves a tool that not only
          helps showcase their achievements but also reflects their unique
          personality and aspirations.
        </p>
        <h4 className="fs-4 mt-5 ">Why Choose Instar Resume?</h4>
        <p className="fw-lighter lh-base">
          User-Centric Design, We've crafted our platform with you in mind.
          Enjoy an intuitive and easy-to-use interface that streamlines the
          resume creation process. Customization: Tailor your resume to reflect
          your individuality. Choose from a variety of templates, colors, and
          styles to make your resume truly yours. Efficiency: Save time and
          effort with our smart features that guide you through each section of
          your resume, ensuring you highlight your skills and experiences
          effectively. QR Code Sharing: Stand out from the crowd by sharing your
          resume through a personalized QR code. Impress potential employers
          with a modern and innovative approach.
        </p>
        <h4 className="fs-4 mt-5 ">Contact</h4>
        <p className="fw-lighter lh-base">email- gayan65728@yahoo.com</p>
        <p className="fw-lighter lh-base">
          This application has been created and deployed as a university
          project.
        </p>
      </div>
      <img
        className="d-block mx-auto mb-4"
        src={loginLogo}
        alt=""
        width="128"
        height="48"
      />
    </div>
  );
};

export default About;
