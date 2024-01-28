import express from "express";
import bodyParser from "body-parser";
import {
  personalGetPerson,
  personalGetPersonal,
  personalGetContact,
  personalGetExp,
  personalGetEdu,
  personalGetLan,
  personalGetOther,
} from "../services/fullprofile_services.js";

const fullProfileRouter = express.Router();
fullProfileRouter.use(bodyParser.urlencoded({ extended: false }));

//Get a User from an email
fullProfileRouter.get("/user/find/:email", async (req, res) => {
  const email = req.params.email;
  const getUser = await personalGetPerson(email);
  if (getUser.length > 0) {
    res.status(200).json({
      success: true,
      message: "user data view successfully!",
      user: getUser,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "user data can not be found!",
    });
  }
});

//Get a personal from a user id
fullProfileRouter.get("/personal/find/:id", async (req, res) => {
  const id = req.params.id;
  const getPersonal = await personalGetPersonal(id);
  if (getPersonal.length > 0) {
    res.status(200).json({
      success: true,
      message: "Personal data view successfully!",
      personal: getPersonal,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Personal data can not be found!",
    });
  }
});

//Get a contact from a user id
fullProfileRouter.get("/contact/find/:id", async (req, res) => {
  const id = req.params.id;
  const getContact = await personalGetContact(id);
  if (getContact.length > 0) {
    res.status(200).json({
      success: true,
      message: "Contact data view successfully!",
      contact: getContact,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Contact data can not be found!",
    });
  }
});

//Get a work exp from a user id
fullProfileRouter.get("/exp/find/:id", async (req, res) => {
  const id = req.params.id;
  const getExp = await personalGetExp(id);
  if (getExp.length > 0) {
    res.status(200).json({
      success: true,
      message: "Work experience data view successfully!",
      exp: getExp,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Work experience data can not be found!",
    });
  }
});

//Get a education from a user id
fullProfileRouter.get("/edu/find/:id", async (req, res) => {
  const id = req.params.id;
  const getEdu = await personalGetEdu(id);
  if (getEdu.length > 0) {
    res.status(200).json({
      success: true,
      message: "Education data view successfully!",
      edu: getEdu,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Education data can not be found!",
    });
  }
});

//Get a Language from a user id
fullProfileRouter.get("/lan/find/:id", async (req, res) => {
  const id = req.params.id;
  const getLan = await personalGetLan(id);
  if (getLan.length > 0) {
    res.status(200).json({
      success: true,
      message: "Language data view successfully!",
      lan: getLan,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Language data can not be found!",
    });
  }
});

//Get an other info from a user id
fullProfileRouter.get("/other/find/:id", async (req, res) => {
  const id = req.params.id;
  const getOther = await personalGetOther(id);
  if (getOther.length > 0) {
    res.status(200).json({
      success: true,
      message: "Other data view successfully!",
      other: getOther,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Other data can not be found!",
    });
  }
});

export default fullProfileRouter;
