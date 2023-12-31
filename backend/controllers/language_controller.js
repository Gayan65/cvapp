import express from "express";
import bodyParser from "body-parser";
import {
  createLanguage,
  getAllLanguage,
  deleteLanguage,
  lanUpdate,
} from "../services/language_services.js";

const lanRouter = express.Router();
lanRouter.use(bodyParser.urlencoded({ extended: false }));

//Creating Language
lanRouter.post("/create", async (req, res) => {
  const { user_id, l_name, l_pro } = req.body;
  const newLan = await createLanguage(user_id, l_name, l_pro);
  res.send(newLan);
});

//Getting all Language
lanRouter.get("/all", async (req, res) => {
  const users = await getAllLanguage();
  res.send(users);
});

//Deleting a Language
lanRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const deletedLan = await deleteLanguage(id);
  res.send(deletedLan);
});

//Updating language info from LAN ID
lanRouter.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { l_name, l_pro } = req.body;
  const updateLan = await lanUpdate(l_name, l_pro, id);
  res.send(updateLan);
});
export default lanRouter;
