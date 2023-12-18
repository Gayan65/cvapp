import express from "express";
import bodyParser from "body-parser";
import mySqlPool from "../models/db.js";
import { getAllUsers, createUser } from "../services/user_services.js";

const userRouter = express.Router();
userRouter.use(bodyParser.urlencoded({ extended: false }));

userRouter.get("/", (req, res) => {
  res.send("List of Users");
});

userRouter.post("/create/user", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const newUser = await createUser(email, password);
  res.send(newUser);
});

userRouter.get("/users/all", async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
});
export default userRouter;
