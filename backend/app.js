import express from "express";
import "express-async-errors";
import "dotenv/config";
import mySqlPool from "./models/db.js";
import userRouter from "./controllers/user_controller.js";
import tableRouter from "./controllers/table_controllers.js";
import personalRouter from "./controllers/personal_controller.js";
import contactRouter from "./controllers/contact_controller.js";
import eduRouter from "./controllers/education_controller.js";
import expRouter from "./controllers/exp_controller.js";
import lanRouter from "./controllers/language_controller.js";

const port = process.env.PORT;
const app = express();

//middleware
app.use("/api/user", userRouter);
app.use("/api/table", tableRouter);
app.use("/api/personal", personalRouter);
app.use("/api/contact", contactRouter);
app.use("/api/edu", eduRouter);
app.use("/api/exp", expRouter);
app.use("/api/lan", lanRouter);

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
