import mySqlPool from "../models/db.js";

//Getting all users sql
export const getAllUsers = async () => {
  const sqlQuery = "SELECT * FROM users";
  const [rows] = await mySqlPool.query(sqlQuery);
  return rows;
};

//Creating user sql
export const createUser = async (email, hash, fname, lname, admin) => {
  const sqlQuery =
    "INSERT INTO users (email, hash, fname, lname, admin) VALUES (?,?,?,?,?)";
  const rows = await mySqlPool.query(sqlQuery, [
    email,
    hash,
    fname,
    lname,
    admin,
  ]);
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
    "SELECT users.user_id, users.email, users.password, users.fname, users.lname, personal.personal_id, personal.user_id, personal.moto, personal.description, personal.image, contact.contact_id, contact.user_id, contact.m_code, contact.m_number, contact.w_code, contact.w_number, contact.address_lane, contact.city, contact.post_code, contact.country, (SELECT GROUP_CONCAT(CONCAT('{`edu_id`: ', edu_id, ', `program`: ', program, ', `program_name`: ', program_name, ', `institution`: ', institution, ', `address`: ', address, ', `s_month`: ', s_month, ', `s_year`: ', s_year, ', `e_month`: ', e_month, ', `e_year`: ', e_year, ', `about`: ', about, '}') ORDER BY edu_id SEPARATOR ',') FROM edu WHERE users.user_id = edu.user_id) AS edu_array, (SELECT GROUP_CONCAT(CONCAT('{`exp_id`: ', exp_id, ', `position`: ', position, ', `employer`: ', employer, ', `address`: ', address, ', `s_month`: ', s_month, ', `s_year`: ', s_year, ', `e_month`: ', e_month, ', `e_year`: ', e_year, ', `task`: ', task, '}') ORDER BY exp_id SEPARATOR ',') FROM exp WHERE users.user_id = exp.user_id) AS exp_array, (SELECT GROUP_CONCAT(CONCAT('{`lan_id`: ', lan_id, ', `l_name`: ', l_name, ', `l_pro`: ', l_pro, '}') ORDER BY lan_id SEPARATOR ',') FROM lan WHERE users.user_id = lan.user_id) AS lan_array FROM users LEFT JOIN personal ON users.user_id = personal.user_id LEFT JOIN contact ON users.user_id = contact.user_id WHERE users.user_id = ? GROUP BY users.user_id, users.email, users.password, users.fname, users.lname, personal.personal_id, personal.user_id, personal.moto, personal.description, personal.image, contact.contact_id, contact.user_id, contact.m_code, contact.m_number, contact.w_code, contact.w_number, contact.address_lane, contact.city, contact.post_code, contact.country;";
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
export const userUpdate = async (fname, lname, user_id) => {
  const sqlQuery = "UPDATE users SET fname = ?, lname = ? WHERE user_id = ?;";
  const [rows] = await mySqlPool.query(sqlQuery, [fname, lname, user_id]);
  return rows;
};

// Updating a users password sql
export const passwordUpdate = async (hash, user_id) => {
  const sqlQuery = "UPDATE users SET hash = ? WHERE user_id = ?;";
  const [rows] = await mySqlPool.query(sqlQuery, [hash, user_id]);
  return rows;
};

//Find User from email
export const userFind = async (email) => {
  const sqlQuery = "SELECT * FROM users WHERE email = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [email]);
  return rows;
};

//User Login from SQL
export const userLogin = async (email, password) => {
  const sqlQuery = "SELECT * FROM users WHERE email = ? AND password = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [email, password]);
  return rows;
};

// Find the user from the user ID
export const userFindById = async (userId) => {
  const sqlQuery = "SELECT * FROM users WHERE user_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [userId]);
  return rows;
};

//     "SELECT users.user_id, users.email, users.password, users.fname, users.lname, personal.personal_id, personal.user_id, personal.moto, personal.description, personal.image, contact.contact_id, contact.user_id, contact.m_code, contact.m_number, contact.w_code, contact.w_number, contact.address_lane, contact.city, contact.post_code, contact.country, GROUP_CONCAT(CONCAT('{`edu_id`: ', edu.edu_id, ', `program`: ', edu.program,', `program_name`: ', edu.program_name, ', `institution`: ', edu.institution, ', `address`: ', edu.address, ', `s_month`: ', edu.s_month, ', `s_year`: ', edu.s_year, ', `e_month`: ', edu.e_month, ', `e_year`: ', edu.e_year, ', `about`: ', edu.about, '}') ORDER BY edu.edu_id SEPARATOR ',') AS edu_array FROM users LEFT JOIN personal ON users.user_id = personal.user_id LEFT JOIN contact ON users.user_id = contact.user_id LEFT JOIN edu ON users.user_id = edu.user_id WHERE users.user_id = '1' GROUP BY users.user_id, users.email, users.password, users.fname, users.lname, personal.personal_id, personal.user_id, personal.moto, personal.description, personal.image, contact.contact_id, contact.user_id, contact.m_code, contact.m_number, contact.w_code, contact.w_number, contact.address_lane, contact.city, contact.post_code, contact.country;";
// previous one work fine but no exp table added

//  "SELECT users.user_id, users.email, users.password, users.fname, users.lname, personal.personal_id, personal.user_id, personal.moto, personal.description, personal.image, contact.contact_id, contact.user_id, contact.m_code, contact.m_number, contact.w_code, contact.w_number, contact.address_lane, contact.city, contact.post_code, contact.country, GROUP_CONCAT(CONCAT('{`edu_id`: ', edu.edu_id, ', `program`: ', edu.program,', `program_name`: ', edu.program_name, ', `institution`: ', edu.institution, ', `address`: ', edu.address, ', `s_month`: ', edu.s_month, ', `s_year`: ', edu.s_year, ', `e_month`: ', edu.e_month, ', `e_year`: ', edu.e_year, ', `about`: ', edu.about, '}') ORDER BY edu.edu_id SEPARATOR ',') AS edu_array, GROUP_CONCAT(CONCAT('{`exp_id`: ', exp.exp_id, ', `position`: ', exp.position,', `employer`: ', exp.employer, ', `address`: ', exp.address, ', `s_month`: ', exp.s_month, ', `s_year`: ', exp.s_year, ', `e_month`: ', exp.e_month, ', `e_year`: ', exp.e_year, ', `task`: ', exp.task, '}') ORDER BY exp.exp_id SEPARATOR ',') AS exp_array FROM users LEFT JOIN personal ON users.user_id = personal.user_id LEFT JOIN contact ON users.user_id = contact.user_id LEFT JOIN edu ON users.user_id = edu.user_id LEFT JOIN exp ON users.user_id = exp.user_id WHERE users.user_id = '1' GROUP BY users.user_id, users.email, users.password, users.fname, users.lname, personal.personal_id, personal.user_id, personal.moto, personal.description, personal.image, contact.contact_id, contact.user_id, contact.m_code, contact.m_number, contact.w_code, contact.w_number, contact.address_lane, contact.city, contact.post_code, contact.country;";
// exp table added but data duplicates

//  "SELECT users.user_id, users.email, users.password, users.fname, users.lname, personal.personal_id, personal.user_id, personal.moto, personal.description, personal.image, contact.contact_id, contact.user_id, contact.m_code, contact.m_number, contact.w_code, contact.w_number, contact.address_lane, contact.city, contact.post_code, contact.country, (SELECT GROUP_CONCAT(CONCAT('{`edu_id`: ', edu_id, ', `program`: ', program, ', `program_name`: ', program_name, ', `institution`: ', institution, ', `address`: ', address, ', `s_month`: ', s_month, ', `s_year`: ', s_year, ', `e_month`: ', e_month, ', `e_year`: ', e_year, ', `about`: ', about, '}') ORDER BY edu_id SEPARATOR ',') FROM edu WHERE users.user_id = edu.user_id) AS edu_array, (SELECT GROUP_CONCAT(CONCAT('{`exp_id`: ', exp_id, ', `position`: ', position, ', `employer`: ', employer, ', `address`: ', address, ', `s_month`: ', s_month, ', `s_year`: ', s_year, ', `e_month`: ', e_month, ', `e_year`: ', e_year, ', `task`: ', task, '}') ORDER BY exp_id SEPARATOR ',') FROM exp WHERE users.user_id = exp.user_id) AS exp_array FROM users LEFT JOIN personal ON users.user_id = personal.user_id LEFT JOIN contact ON users.user_id = contact.user_id WHERE users.user_id = ? GROUP BY users.user_id, users.email, users.password, users.fname, users.lname, personal.personal_id, personal.user_id, personal.moto, personal.description, personal.image, contact.contact_id, contact.user_id, contact.m_code, contact.m_number, contact.w_code, contact.w_number, contact.address_lane, contact.city, contact.post_code, contact.country;";
// Last version of working
