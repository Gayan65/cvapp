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
    "SELECT users.user_id, users.email, users.password, users.fname, users.lname, personal.personal_id, personal.user_id, personal.moto, personal.description, personal.image, contact.contact_id, contact.user_id, contact.m_code, contact.m_number, contact.w_code, contact.w_number, contact.address_lane, contact.city, contact.post_code, contact.country, GROUP_CONCAT(CONCAT('{`edu_id`: ', edu.edu_id, ', `program`: ', edu.program,', `program_name`: ', edu.program_name, ', `institution`: ', edu.institution, ', , `address`: ', edu.address, ', `s_month`: ', edu.s_month, ', `s_year`: ', edu.s_year, ', `e_month`: ', edu.e_month, ', `e_year`: ', edu.e_year, ', `about`: ', edu.about, '}') ORDER BY edu.edu_id SEPARATOR ',') AS edu_array FROM users LEFT JOIN personal ON users.user_id = personal.user_id LEFT JOIN contact ON users.user_id = contact.user_id LEFT JOIN edu ON users.user_id = edu.user_id WHERE users.user_id = '1' GROUP BY users.user_id, users.email, users.password, users.fname, users.lname, personal.personal_id, personal.user_id, personal.moto, personal.description, personal.image, contact.contact_id, contact.user_id, contact.m_code, contact.m_number, contact.w_code, contact.w_number, contact.address_lane, contact.city, contact.post_code, contact.country;";

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

//  "SELECT * FROM users LEFT JOIN personal ON users.user_id = personal.user_id LEFT JOIN contact ON users.user_id = contact.user_id WHERE users.user_id = ?";
// This is the first version for getting full profile function - bug creating two user objects

//   "SELECT users.*, personal.*, contact.*, GROUP_CONCAT(JSON_OBJECT('edu_id', edu.edu_id, 'program', edu.program, 'program_name', edu.program_name, 'institution', edu.institution, 'date_start', edu.date_start, 'date_end', edu.date_end, 'about', edu.about) ORDER BY edu.edu_id SEPARATOR ',') AS edu_array FROM users LEFT JOIN personal ON users.user_id = personal.user_id LEFT JOIN contact ON users.user_id = contact.user_id LEFT JOIN edu ON users.user_id = edu.user_id WHERE users.user_id = ? GROUP BY users.user_id;";
// duplication of first work not successful yet

//   "SELECT users.user_id, users.email, users.`password`, users.fname, users.lname, personal.personal_id, personal.user_id, personal.moto, personal.description, personal.image, contact.contact_id, contact.user_id, contact.m_code, contact.m_number, contact.w_code, contact.w_number, contact.address_lane, contact.city, contact.post_code, contact.country, GROUP_CONCAT(CONCAT('{`edu_id`: ', edu.edu_id, ', `program`: ', edu.program,', `program_name`: ', edu.program_name, ', `institution`: ', edu.institution, ', `date_start`: ', edu.date_start, ', `date_end`: ', edu.date_end, ', `about`: ', edu.about, '}') ORDER BY edu.edu_id SEPARATOR ',') AS edu_array FROM users LEFT JOIN personal ON users.user_id = personal.user_id LEFT JOIN contact ON users.user_id = contact.user_id LEFT JOIN edu ON users.user_id = edu.user_id WHERE users.user_id = '1' GROUP BY users.user_id, users.email, users.`password`, users.fname, users.lname, personal.personal_id, personal.user_id, personal.moto, personal.description, personal.image, contact.contact_id, contact.user_id, contact.m_code, contact.m_number, contact.w_code, contact.w_number, contact.address_lane, contact.city, contact.post_code, contact.country;";
//This is the second version not tried yet for accessing information this not success at all
