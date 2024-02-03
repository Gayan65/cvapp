import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import {
  getAllUsers,
  getUser,
  userProfile,
  userDelete,
  userUpdate,
  userFindById,
  passwordUpdate,
} from "../services/user_services.js";

const userRouter = express.Router();
userRouter.use(bodyParser.urlencoded({ extended: false }));
const saltRounds = parseInt(process.env.SALT);

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
  if (deletedUser.affectedRows === 0) {
    res.status(200).json({
      success: false,
      message: "User can not be deleted!",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Profile Delete successfully!",
    });
  }
});

//Updating a user from the id (ONLY UPDATES FNAME AND LNAME)
userRouter.put("/update/:id", async (req, res) => {
  const { fname, lname } = req.body;
  const updatedUser = await userUpdate(fname, lname, req.params.id);
  if (updatedUser.affectedRows === 0) {
    res.status(200).json({
      success: false,
      message: "profile can not be found, and not updated!",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
    });
  }
});

//Updating a user from the id (ONLY UPDATES PASSWORD)
userRouter.put("/change_pw/:id", (req, res) => {
  const { password } = req.body;
  const id = req.params.id;
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    const pwUpdatedUser = await passwordUpdate(hash, id);
    if (pwUpdatedUser.affectedRows === 0) {
      res.status(200).json({
        success: false,
        message: "profile can not be found, and not updated!",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    }
  });
});

//find a user from the id
userRouter.get("/find/:id", async (req, res) => {
  const jwtId = req.params.id;
  const decodedToken = jwt.verify(jwtId, process.env.JWT_KEY);
  const foundUser = await userFindById(decodedToken.userId);
  res.status(200).json({
    success: true,
    user: foundUser,
  });
});
export default userRouter;
