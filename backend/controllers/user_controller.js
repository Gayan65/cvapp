import express from "express";
import bodyParser from "body-parser";
import mySqlPool from "../models/db.js";
import { getAllUsers, createUser } from "../services/user_services.js";

const userRouter = express.Router();
userRouter.use(bodyParser.urlencoded({ extended: false }));

userRouter.post("/create", async (req, res) => {
  const { email, password, fname, lname } = req.body;
  const newUser = await createUser(email, password, fname, lname);
  res.send(newUser);
});

userRouter.get("/all", async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
});
export default userRouter;
