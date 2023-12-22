import express from "express";
import bodyParser from "body-parser";
import {
  createEdu,
  getAllEdu,
  eduUpdate,
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
    s_month,
    s_year,
    e_month,
    e_year,
    about,
  } = req.body;
  const newEdu = await createEdu(
    user_id,
    program,
    program_name,
    institution,
    s_month,
    s_year,
    e_month,
    e_year,
    about
  );
  res.send(newEdu);
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
    s_month,
    s_year,
    e_month,
    e_year,
    about,
    id
  );
  res.send(updatedEdu);
});

export default eduRouter;
