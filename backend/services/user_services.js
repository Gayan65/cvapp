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

//Getting a user from the user ID SQl
export const getUser = async (user_id) => {
  const sqlQuery = "SELECT * FROM users WHERE user_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [user_id]);
  return rows;
};

// Getting a full profile from the user ID SQl
export const userProfile = async (user_id) => {
  const sqlQuery =
    "SELECT * FROM users LEFT JOIN personal ON users.user_id = personal.user_id LEFT JOIN contact ON users.user_id = contact.user_id WHERE users.user_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [user_id]);
  return rows;
};

// Deleting a user from the user ID SQl
export const userDelete = async (user_id) => {
  const sqlQuery = "DELETE FROM users WHERE user_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [user_id]);
  return rows;
};

// Updating a user from the user ID SQl
export const userUpdate = async (password, fname, lname, user_id) => {
  const sqlQuery =
    "UPDATE users SET password = ?, fname = ?, lname = ? WHERE user_id = ?;";
  const [rows] = await mySqlPool.query(sqlQuery, [
    password,
    fname,
    lname,
    user_id,
  ]);
  return rows;
};
