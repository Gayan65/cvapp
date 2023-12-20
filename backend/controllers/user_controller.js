import express from "express";
import bodyParser from "body-parser";
import {
  getAllUsers,
  createUser,
  getUser,
  userProfile,
} from "../services/user_services.js";

const userRouter = express.Router();
userRouter.use(bodyParser.urlencoded({ extended: false }));

//Creating user
userRouter.post("/create", async (req, res) => {
  const { email, password, fname, lname } = req.body;
  const newUser = await createUser(email, password, fname, lname);
  res.send(newUser);
});

//Getting all users
userRouter.get("/all", async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
});

//Getting a user from the user ID
userRouter.get("/:id", async (req, res) => {
  const user = await getUser(req.params.id);
  res.send(user);
});

//Getting the entire profile from the id
userRouter.get("/profile/:id", async (req, res) => {
  const profile = await userProfile(req.params.id);
  res.send(profile);
});
export default userRouter;
