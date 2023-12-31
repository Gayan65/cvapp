import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import jwt from "jsonwebtoken";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
import {
  createPersonal,
  getAllPersonal,
  personalUpdate,
  personalUpdateWithoutImg,
  personalGetPerson,
  createPersonalWithoutImg,
} from "../services/personal_services.js";

const personalRouter = express.Router();
personalRouter.use(bodyParser.urlencoded({ extended: false }));

//Creating personal info
personalRouter.post("/create", upload.single("image"), async (req, res) => {
  const { user_token, moto, description } = req.body;
  //Getting user id from the token
  const decodedToken = jwt.verify(user_token, process.env.JWT_KEY);
  const id = decodedToken.userId;

  if (req.file === undefined) {
    const newPersonal = await createPersonalWithoutImg(id, moto, description);
    res.status(200).json({
      success: true,
      message: "Personal information added successfully!",
      personal: newPersonal,
    });
  } else {
    // Converting the image file (png) to base 64 string formate
    const myImage = req.file.buffer.toString("base64");
    const newPersonal = await createPersonal(id, moto, description, myImage);
    res.status(200).json({
      success: true,
      message: "Personal information added successfully!",
      personal: newPersonal,
    });
  }
});

//Getting all personal info
personalRouter.get("/all", async (req, res) => {
  const personals = await getAllPersonal();
  res.send(personals);
});

//Updating a personal from the user id
personalRouter.put("/update/:id", upload.single("image"), async (req, res) => {
  const jwtId = req.params.id;
  const decodedToken = jwt.verify(jwtId, process.env.JWT_KEY);
  const id = decodedToken.userId;
  const { moto, description } = req.body;
  if (req.file === undefined) {
    const updatedPersonal = await personalUpdateWithoutImg(
      moto,
      description,
      id
    );
    if (updatedPersonal.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Information updated Successfully!",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Information is not updated",
      });
    }
  } else {
    const myImage = req.file.buffer.toString("base64");
    const updatedPersonal = await personalUpdate(
      moto,
      description,
      myImage,
      id
    );
    if (updatedPersonal.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Information updated Successfully!",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Information is not updated",
      });
    }
  }
});

//Get a personal from a user id
personalRouter.get("/find/:id", async (req, res) => {
  const jwtId = req.params.id;
  const decodedToken = jwt.verify(jwtId, process.env.JWT_KEY);
  const getPersonal = await personalGetPerson(decodedToken.userId);
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

export default personalRouter;
