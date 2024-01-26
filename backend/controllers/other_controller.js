import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const otherRouter = express.Router();
otherRouter.use(bodyParser.urlencoded({ extended: false }));

//Creating Language
otherRouter.post("/create", async (req, res) => {
  try {
    const { user_id, topic, content } = req.body;
    //Decoding the jwt token
    const decodedToken = jwt.verify(user_id, process.env.JWT_KEY);
    const id = decodedToken.userId;

    console.log(id, topic, content);
    /*
    const newLan = await createLanguage(id, topic, content );
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
    }*/
  } catch (error) {
    res.status(200).json({
      success: false,
      message:
        "Select an appropriate Option, or check your data is duplicated !",
    });
  }
});

export default otherRouter;
