import express from "express";
import bodyParser from "body-parser";
import { createExp, getAllExp } from "../services/exp_services.js";

const expRouter = express.Router();
expRouter.use(bodyParser.urlencoded({ extended: false }));

//Creating edu info
expRouter.post("/create", async (req, res) => {
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
  const newEdu = await createExp(
    user_id,
    position,
    employer,
    address,
    s_month,
    s_year,
    e_month,
    e_year,
    task
  );
  res.send(newEdu);
});

// Getting all exp info
expRouter.get("/all", async (req, res) => {
  const allExp = await getAllExp();
  res.send(allExp);
});

// user_id, position, employer, address, s_month, s_year, e_month, e_year, task

export default expRouter;
