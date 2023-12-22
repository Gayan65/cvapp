import express from "express";
import bodyParser from "body-parser";

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

// user_id, position, employer, address, s_month, s_year, e_month, e_year, task
