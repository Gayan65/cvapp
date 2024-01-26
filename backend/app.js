import express from "express";
import "express-async-errors";
import "dotenv/config";
import cors from "cors";
import mySqlPool from "./models/db.js";
import userRouter from "./controllers/user_controller.js";
import tableRouter from "./controllers/table_controllers.js";
import personalRouter from "./controllers/personal_controller.js";
import contactRouter from "./controllers/contact_controller.js";
import eduRouter from "./controllers/education_controller.js";
import expRouter from "./controllers/exp_controller.js";
import lanRouter from "./controllers/language_controller.js";
import userLoginRouter from "./controllers/user_login_controller.js";
import restLanguageRouter from "./controllers/rest_language.js";
import otherRouter from "./controllers/other_controller.js";
import fullProfileRouter from "./controllers/fullprofile_controller.js";
import { auth } from "./middleware/auth.js";

const port = process.env.PORT;
const app = express();

//middleware
app.use(cors());
app.use("/api/user_login", userLoginRouter);
app.use("/api/user", auth, userRouter);
app.use("/api/table", tableRouter);
app.use("/api/personal", auth, personalRouter);
app.use("/api/contact", auth, contactRouter);
app.use("/api/edu", auth, eduRouter);
app.use("/api/exp", auth, expRouter);
app.use("/api/lan", auth, lanRouter);
app.use("/api/rest_language", restLanguageRouter);
app.use("/api/other", auth, otherRouter);
app.use("/api/profile", fullProfileRouter);

//Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send("Something went wrong in server side!");
});

//DB connection and server
mySqlPool
  .query("SELECT 1")
  .then((data) => {
    console.log("DB connected successfully...");
    app.listen(port, () => {
      console.log(`Server is running in port ${port} successfully`);
    });
  })
  .catch((err) => console.log("DB connection error \n" + err));
