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

//Getting work exp info from use id
export const personalGetExp = async (id) => {
  const sqlQuery =
    "SELECT position, employer, address, s_month, s_year, e_month, e_year, task FROM exp WHERE user_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [id]);
  return rows;
};

//Getting education info from use id
export const personalGetEdu = async (id) => {
  const sqlQuery =
    "SELECT program, program_name, institution, address, s_month, s_year, e_month, e_year, about FROM edu WHERE user_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [id]);
  return rows;
};

//Getting language info from use id
export const personalGetLan = async (id) => {
  const sqlQuery = "SELECT l_name, l_pro FROM lan WHERE user_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [id]);
  return rows;
};

//Getting other info from use id
export const personalGetOther = async (id) => {
  const sqlQuery = "SELECT topic, content FROM other WHERE user_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [id]);
  return rows;
};
