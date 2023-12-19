import express from "express";
import "express-async-errors";
import "dotenv/config";
import mySqlPool from "./models/db.js";
import userRouter from "./controllers/user_controller.js";
import tableRouter from "./controllers/table_controllers.js";
import personalRouter from "./controllers/personal_controller.js";

const port = process.env.PORT;
const app = express();

//middleware
app.use("/api/user", userRouter);
app.use("/api/table", tableRouter);
app.use("/api/personal", personalRouter);

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

/*

app.get("/", async (req, res) => {
  const users = await usersSchema.getAllUsers();
  res.json(users);
});







//database connection
//const con = mysql.createConnection(url);

/*
//table creating function
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sql =
    "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(50), password VARCHAR(50))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});


//Table deleting function
con.connect(function (err) {
  if (err) throw err;
  var sql = "DROP TABLE userTbl";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table deleted");
  });
});
*/
