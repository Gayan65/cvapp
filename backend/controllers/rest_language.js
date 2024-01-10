import express from "express";
import bodyParser from "body-parser";
import { isoLangs } from "../config/language.js";

const restLanguageRouter = express.Router();
restLanguageRouter.use(bodyParser.urlencoded({ extended: false }));

//Sending all languages to the frontend
restLanguageRouter.get("/", (req, res) => {
  res.send(isoLangs[0].name);
});

export default restLanguageRouter;
