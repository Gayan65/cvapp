import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./Start";
import Login from "./Login";
import Register from "./Register";
import NavBar from "./NavBar";
import Home from "./app_components/Home";
import Profile from "./app_components/Profile";
import PersonalInfo from "./cv_components/PersonalInfo";
import ContactInfo from "./cv_components/ContactInfo";
import LanguageInfo from "./cv_components/LanguageInfo";
import EducationInfo from "./cv_components/EducationInfo";
import WorkExInfo from "./cv_components/WorkExInfo";
import Other from "./cv_components/Other";
import CvProfile from "./CvProfile";
import Search from "./Search";
import Admin from "./app_components/Admin";
import About from "./About";
import Product from "./Product";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<Start />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/personal_info" element={<PersonalInfo />}></Route>
          <Route path="/contact_info" element={<ContactInfo />}></Route>
          <Route path="/language_info" element={<LanguageInfo />}></Route>
          <Route path="/education_info" element={<EducationInfo />}></Route>
          <Route path="/work_ex_info" element={<WorkExInfo />}></Route>
          <Route path="/other" element={<Other />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/admin_function" element={<Admin />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/cv_profile/:email" element={<CvProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
