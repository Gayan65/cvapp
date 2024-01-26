import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { allUserOther, createOther } from "../services/other_services.js";

const otherRouter = express.Router();
otherRouter.use(bodyParser.urlencoded({ extended: false }));

//Creating Language
otherRouter.post("/create", async (req, res) => {
  try {
    const { user_id, topic, content } = req.body;
    //Decoding the jwt token
    const decodedToken = jwt.verify(user_id, process.env.JWT_KEY);
    const id = decodedToken.userId;
    const newOther = await createOther(id, topic, content);
    if (newOther.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Other info Added successfully!",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Other info can not be added !",
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

//Getting all Other from a user id
otherRouter.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  //Decoding the jwt token
  const decodedToken = jwt.verify(id, process.env.JWT_KEY);
  const user_id = decodedToken.userId;
  const allOther = await allUserOther(user_id);
  if (allOther.length > 0) {
    res.status(200).json({
      success: true,
      message: "found Other info!",
      other_info: allOther,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "not found languages!",
    });
  }
});

export default otherRouter;
