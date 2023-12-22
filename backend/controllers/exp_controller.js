import express from "express";
import bodyParser from "body-parser";
import { createExp, getAllExp, expUpdate } from "../services/exp_services.js";

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

export default expRouter;
