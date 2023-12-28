import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { userFind, createUser } from "../services/user_services.js";

const userLoginRouter = express.Router();
userLoginRouter.use(bodyParser.urlencoded({ extended: false }));

const saltRounds = 10;

//Login user
userLoginRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userFind(email);
  if (existingUser.length > 0) {
    const hashedPw = existingUser[0].hash;
    bcrypt.compare(password, hashedPw, function (err, result) {
      if (result) {
        const payLoad = { id: existingUser[0].id };
        const token = jwt.sign(payLoad, process.env.JWT_KEY, {
          expiresIn: 60,
        });
        res.status(200).json({
          success: true,
          message: "User login successful!",
          user: existingUser[0],
          token: token,
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Invalid credentials!",
        });
      }
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Invalid credentials!",
    });
  }
});

//Creating user
userLoginRouter.post("/create", async (req, res) => {
  const { email, password, fname, lname, admin } = req.body;
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    const existingUser = await userFind(email);
    if (existingUser.length > 0) {
      res.status(200).json({
        success: false,
        message: "Email already exists!",
      });
    } else {
      const newUser = await createUser(email, hash, fname, lname, admin);
      res.status(200).json({
        success: true,
        message: "User Created successful!",
        user: newUser,
      });
    }
  });
});

export default userLoginRouter;
