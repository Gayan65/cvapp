import mySqlPool from "../models/db.js";

//Getting all users sql
export const getAllUsers = async () => {
  const sqlQuery = "SELECT * FROM users";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//Creating user sql
export const createUser = async (email, password, fname, lname) => {
  const sqlQuery =
    "INSERT INTO users (email, password, fname, lname) VALUES (?,?,?,?)";
  const rows = await mySqlPool.query(sqlQuery, [email, password, fname, lname]);

  return rows;
};
