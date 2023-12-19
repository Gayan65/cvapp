import mySqlPool from "../models/db.js";

export const getAllUsers = async () => {
  const sqlQuery = "SELECT * FROM users";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

export const createUser = async (email, password) => {
  const sqlQuery = "INSERT INTO users (email, password) VALUES (?,?)";
  const rows = await mySqlPool
    .query(sqlQuery, [email, password])
    .catch((err) => console.log(err));

  return rows;
};
