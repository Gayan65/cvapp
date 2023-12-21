import express from "express";
import bodyParser from "body-parser";
import { createEdu, getAllEdu } from "../services/education_service.js";

const eduRouter = express.Router();
eduRouter.use(bodyParser.urlencoded({ extended: false }));

//Creating edu info
eduRouter.post("/create", async (req, res) => {
  const {
    user_id,
    program,
    program_name,
    institution,
    date_start,
    date_end,
    about,
  } = req.body;
  const newEdu = await createEdu(
    user_id,
    program,
    program_name,
    institution,
    date_start,
    date_end,
    about
  );
  res.send(newEdu);
});

// Getting all edu info
eduRouter.get("/all", async (req, res) => {
  const allEdu = await getAllEdu();
  res.send(allEdu);
});

export default eduRouter;
//  user_id, program, program_name, institution, date_start, date_end, about,
