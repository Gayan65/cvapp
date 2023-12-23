import express from "express";
import bodyParser from "body-parser";
import {
  createLanguage,
  getAllLanguage,
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

export default lanRouter;
