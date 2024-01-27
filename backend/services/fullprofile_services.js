import mySqlPool from "../models/db.js";

//Getting personal info from use id
export const personalGetPerson = async (email) => {
  const sqlQuery =
    "SELECT user_id, fname, lname, email FROM users WHERE email = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [email]);
  return rows;
};

//Getting personal info from use id
export const personalGetPersonal = async (id) => {
  const sqlQuery =
    "SELECT moto, description, image FROM personal WHERE user_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [id]);
  return rows;
};

//Getting contact info from use id
export const personalGetContact = async (id) => {
  const sqlQuery =
    "SELECT address_lane, city, country, m_code, m_number, post_code, w_code, w_number FROM contact WHERE user_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [id]);
  return rows;
};
