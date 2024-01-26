import express from "express";
import bodyParser from "body-parser";
import { personalGetPerson } from "../services/fullprofile_services.js";

const fullProfileRouter = express.Router();
fullProfileRouter.use(bodyParser.urlencoded({ extended: false }));

//Get a personal from a user id
fullProfileRouter.get("/find/:email", async (req, res) => {
  const email = req.params.email;
  const getUser = await personalGetPerson(email);
  if (getUser.length > 0) {
    res.status(200).json({
      success: true,
      message: "Personal data view successfully!",
      user: getUser,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Personal data can not be found!",
    });
  }
});

export default fullProfileRouter;
