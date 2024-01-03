import express from "express";
import bodyParser from "body-parser";
import {
  createPersonal,
  getAllPersonal,
  personalUpdate,
  personalGetPerson,
} from "../services/personal_services.js";

const personalRouter = express.Router();
personalRouter.use(bodyParser.urlencoded({ extended: false }));

//Creating personal info
personalRouter.post("/create", async (req, res) => {
  const { user_id, moto, description, image } = req.body;
  const newPersonal = await createPersonal(user_id, moto, description, image);
  res.send(newPersonal);
});

//Getting all personal info
personalRouter.get("/all", async (req, res) => {
  const personals = await getAllPersonal();
  res.send(personals);
});

//Updating a personal from the user id
personalRouter.put("/update/:id", async (req, res) => {
  const { moto, description, image } = req.body;
  const updatedPersonal = await personalUpdate(
    moto,
    description,
    image,
    req.params.id
  );
  if (updatedPersonal.affectedRows === 0) {
    res.send("Nothing to update");
  } else {
    res.send(updatedPersonal);
  }
});

//Get a personal from a user id
personalRouter.get("/personal_dtl", async (req, res) => {
  const { user_id } = req.body;
  const getPersonal = await personalGetPerson(user_id);
  if (getPersonal.length > 0) {
    res.status(200).json({
      success: true,
      message: "Personal data view successfully!",
      personal: getPersonal[0],
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Personal data can not be found!",
    });
  }
});

export default personalRouter;
