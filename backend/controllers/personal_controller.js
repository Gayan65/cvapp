import express from "express";
import bodyParser from "body-parser";
import {
  createPersonal,
  getAllPersonal,
  personalUpdate,
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

export default personalRouter;
