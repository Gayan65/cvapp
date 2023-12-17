// IMPORTING PACKAGES
import express from "express";
import mysql from "mysql2";

//IMPORTING ENV VARIABLES
import "dotenv/config";

const port = process.env.PORT;
const url = process.env.DATABASE_URL;
const user = process.env.USER;
const password = process.env.PASSWORD;
const app = express();

app.listen(port, () => {
  console.log(`Server is running in port ${port} successfully`);
});

//database connection
const con = mysql.createConnection(url);

//table creating function
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE datas (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
