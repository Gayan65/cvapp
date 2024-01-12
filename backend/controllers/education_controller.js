import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import {
  createEdu,
  getAllEdu,
  eduUpdate,
  eduDelete,
} from "../services/education_service.js";

const eduRouter = express.Router();
eduRouter.use(bodyParser.urlencoded({ extended: false }));

//Creating edu info
eduRouter.post("/create", async (req, res) => {
  const {
    user_id,
    program,
    program_name,
    institution,
    address,
    s_month,
    s_year,
    e_month,
    e_year,
    about,
  } = req.body;
  //Decoding the jwt token
  const decodedToken = jwt.verify(user_id, process.env.JWT_KEY);
  const id = decodedToken.userId;
  const newEdu = await createEdu(
    id,
    program,
    program_name,
    institution,
    address,
    s_month,
    s_year,
    e_month,
    e_year,
    about
  );

  if (newEdu.affectedRows > 0) {
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
});

// Getting all edu info
eduRouter.get("/all", async (req, res) => {
  const allEdu = await getAllEdu();
  res.send(allEdu);
});

//Updating edu info from EDU ID
eduRouter.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const {
    program,
    program_name,
    institution,
    address,
    s_month,
    s_year,
    e_month,
    e_year,
    about,
  } = req.body;
  const updatedEdu = await eduUpdate(
    program,
    program_name,
    institution,
    address,
    s_month,
    s_year,
    e_month,
    e_year,
    about,
    id
  );
  res.send(updatedEdu);
});

//Deleting a edu from the edu_id
eduRouter.delete("/delete/:id", async (req, res) => {
  const deletedEdu = await eduDelete(req.params.id);
  res.send(deletedEdu);
});

export default eduRouter;
