import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import {
  createExp,
  getAllExp,
  expUpdate,
  expDelete,
  getAllExpUser,
} from "../services/exp_services.js";

const expRouter = express.Router();
expRouter.use(bodyParser.urlencoded({ extended: false }));

//Creating edu info
expRouter.post("/create", async (req, res) => {
  try {
    const {
      user_id,
      position,
      employer,
      address,
      s_month,
      s_year,
      e_month,
      e_year,
      task,
    } = req.body;
    //Decoding the jwt token
    const decodedToken = jwt.verify(user_id, process.env.JWT_KEY);
    const id = decodedToken.userId;
    const newExp = await createExp(
      id,
      position,
      employer,
      address,
      s_month,
      s_year,
      e_month,
      e_year,
      task
    );
    if (newExp.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Work experience information Added successfully!",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Work experience information can not be added!",
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

// Getting all exp info
expRouter.get("/all", async (req, res) => {
  const allExp = await getAllExp();
  res.send(allExp);
});

//Updating exp info from exp ID
expRouter.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const {
    position,
    employer,
    address,
    s_month,
    s_year,
    e_month,
    e_year,
    task,
  } = req.body;
  const updatedExp = await expUpdate(
    position,
    employer,
    address,
    s_month,
    s_year,
    e_month,
    e_year,
    task,
    id
  );
  res.send(updatedExp);
});

//Deleting a exp from the exp_id
expRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const deletedExp = await expDelete(id);
  if (deletedExp.affectedRows > 0) {
    res.status(200).json({
      success: true,
      message: "Work experience info deleted successfully!",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Work experience info not deleted successfully!",
    });
  }
});

// Getting all exp info from a user id
expRouter.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  //Decoding the jwt token
  const decodedToken = jwt.verify(id, process.env.JWT_KEY);
  const user_id = decodedToken.userId;
  const allExp = await getAllExpUser(user_id);
  if (allExp.length > 0) {
    res.status(200).json({
      success: true,
      message: "found Work experience  information!",
      work_exp: allExp,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "not found Work experience information!",
    });
  }
});

export default expRouter;
