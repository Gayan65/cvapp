import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import {
  createLanguage,
  getAllLanguage,
  deleteLanguage,
  lanUpdate,
  allUserLan,
} from "../services/language_services.js";

const lanRouter = express.Router();
lanRouter.use(bodyParser.urlencoded({ extended: false }));

//Creating Language
lanRouter.post("/create", async (req, res) => {
  try {
    const { user_id, l_name, l_pro } = req.body;
    //Decoding the jwt token
    const decodedToken = jwt.verify(user_id, process.env.JWT_KEY);
    const id = decodedToken.userId;
    const newLan = await createLanguage(id, l_name, l_pro);
    if (newLan.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Language Added successfully!",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Language can not be added !",
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message:
        "Select an appropriate Option, or check your data is duplicated !",
    });
  }
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

//Getting all Languages from a user id
lanRouter.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  //Decoding the jwt token
  const decodedToken = jwt.verify(id, process.env.JWT_KEY);
  const user_id = decodedToken.userId;
  const allLan = await allUserLan(user_id);
  if (allLan.length > 0) {
    res.status(200).json({
      success: true,
      message: "found languages!",
      languages: allLan,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "not found languages!",
    });
  }
});
export default lanRouter;
