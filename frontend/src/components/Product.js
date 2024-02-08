import React from "react";
import loginLogo from "../images/logos/LogoSmall.png";

const Product = () => {
  return (
    <div className="container">
      <div className="py-5">
        <h2 className="fs-2 ">Products and Service:</h2>
        <p className="fw-lighter lead lh-base">
          Intuitive Resume Builder: Create a professional resume in minutes with
          our easy-to-use resume builder. Choose from a range of templates
          designed to suit various industries. QR Code Sharing: Share your
          resume effortlessly by generating a unique QR code. Allow recruiters
          and employers to access your resume with a simple scan. Downloadable
          PDF: Download your resume in PDF format for easy sharing and printing.
          Ensure compatibility across different platforms and devices. Real-Time
          Editing: Make updates to your resume in real-time, ensuring your
          document is always up-to-date. Edit and refine your information as
          your skills and experiences grow.
        </p>
        <h3 className="fs-2 mt-5">Getting Started:</h3>
        <p className="lead fw-normal lh-base">
          Ready to elevate your resume? Sign up for Instar Resume today and
          embark on a journey to create a resume that not only reflects your
          qualifications but also showcases your unique story.
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

export default Product;
