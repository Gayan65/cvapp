import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  getAllUsers,
  createUser,
  getUser,
  userProfile,
  userDelete,
  userUpdate,
  userFind,
  userLogin,
} from "../services/user_services.js";

const userRouter = express.Router();
userRouter.use(bodyParser.urlencoded({ extended: false }));

const saltRounds = 10;

//Creating user
userRouter.post("/create", async (req, res) => {
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
  /*
  //accessing the edu column in JASON FORMAT
  let eduArrayString = profile[0].edu_array;

  // Add square brackets to make it a valid JSON array
  eduArrayString = "[" + eduArrayString + "]";

  // Replace backticks with double quotes for string values
  eduArrayString = eduArrayString.replace(/`([^`]+)`/g, '"$1"');

  eduArrayString = eduArrayString.replace(
    /:(\s*)([^\d"'\][{,}\s][^"'\][{,}\s]*)/g,
    ':"$2"'
  );

  // Parse the string to a JavaScript array of objects
  const eduArray = JSON.parse(eduArrayString);

  // Now, eduArray is a valid JSON array of objects
  console.log(eduArray[1].edu_id);
*/
  res.send(profile);
});

//Deleting a user from the id
userRouter.delete("/delete/:id", async (req, res) => {
  const deletedUser = await userDelete(req.params.id);
  res.send(deletedUser);
});

//Updating a user from the id
userRouter.put("/update/:id", async (req, res) => {
  const { password, fname, lname } = req.body;
  const updatedUser = await userUpdate(password, fname, lname, req.params.id);
  console.log(updatedUser.affectedRows);
  if (updatedUser.affectedRows === 0) {
    res.send("Nothing to update");
  } else {
    res.send(updatedUser);
  }
});

//Login user
userRouter.post("/login", async (req, res) => {
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
export default userRouter;
