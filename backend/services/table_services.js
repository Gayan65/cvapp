import mySqlPool from "../models/db.js";

//creating user table function
export const createUserTable = async () => {
  const sqlQuery =
    "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL, fname VARCHAR(50) NOT NULL, lname VARCHAR(50) NOT NULL)";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//deleting user table function
export const deleteUserTable = async () => {
  const sqlQuery = "DROP TABLE users";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};
