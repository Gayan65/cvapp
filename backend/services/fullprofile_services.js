import mySqlPool from "../models/db.js";

//Getting personal info from use id
export const personalGetPerson = async (email) => {
  const sqlQuery =
    "SELECT user_id, fname, lname, email FROM users WHERE email = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [email]);
  return rows;
};
