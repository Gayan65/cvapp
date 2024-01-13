import mySqlPool from "../models/db.js";

//creating user table function
export const createUserTable = async () => {
  const sqlQuery =
    "CREATE TABLE users (user_id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(50) UNIQUE NOT NULL, hash VARCHAR(150) NOT NULL, fname VARCHAR(50) NOT NULL, lname VARCHAR(50) NOT NULL, admin BOOLEAN NOT NULL)";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//deleting user table function
export const deleteUserTable = async () => {
  const sqlQuery = "DROP TABLE users";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//creating personal table function
export const createPersonalTable = async () => {
  const sqlQuery =
    "CREATE TABLE personal (personal_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, moto VARCHAR(100), description VARCHAR(600) NOT NULL, image LONGTEXT, INDEX `idx_user` (user_id), CONSTRAINT `fk_character_user` FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE)";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//deleting user table function
export const deletePersonalTable = async () => {
  const sqlQuery = "DROP TABLE personal";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//creating contact table function
export const createContactTable = async () => {
  const sqlQuery =
    "CREATE TABLE contact (contact_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, m_code VARCHAR(10), m_number VARCHAR(15), w_code VARCHAR(10), w_number VARCHAR(15), address_lane VARCHAR(255), city VARCHAR(55), post_code VARCHAR(15), country VARCHAR(30), INDEX `idx_user` (user_id), CONSTRAINT `fk_character_user_contacts` FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE)";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//deleting contact table function
export const deleteContactTable = async () => {
  const sqlQuery = "DROP TABLE contact";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//creating edu table function
export const createEduTable = async () => {
  const sqlQuery =
    "CREATE TABLE edu (edu_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, program VARCHAR(55) NOT NULL, program_name VARCHAR(255) NOT NULL, institution VARCHAR(500) NOT NULL, address VARCHAR(255) NOT NULL, s_month VARCHAR(10) NOT NULL, s_year VARCHAR(10) NOT NULL, e_month VARCHAR(10) NOT NULL, e_year VARCHAR(10) NOT NULL, about VARCHAR(1000) NOT NULL, INDEX `idx_user` (user_id), CONSTRAINT `fk_character_user_edu` FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE)";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//deleting edu table function
export const deleteEduTable = async () => {
  const sqlQuery = "DROP TABLE edu";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//creating exp table function
export const createExpTable = async () => {
  const sqlQuery =
    "CREATE TABLE exp (exp_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, position VARCHAR(100), employer VARCHAR(150), address VARCHAR(255), s_month VARCHAR(10), s_year VARCHAR(10), e_month VARCHAR(10), e_year VARCHAR(10), task VARCHAR(2000), INDEX `idx_user` (user_id), CONSTRAINT `fk_character_user_exp` FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE)";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//deleting exp table function
export const deleteExpTable = async () => {
  const sqlQuery = "DROP TABLE exp";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//creating language table function
export const createLanTable = async () => {
  const sqlQuery =
    "CREATE TABLE lan (lan_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, l_name VARCHAR(20) UNIQUE NOT NULL, l_pro VARCHAR(20) NOT NULL, INDEX `idx_user` (user_id), CONSTRAINT `fk_character_user_lan` FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE)";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//deleting language table function
export const deleteLanTable = async () => {
  const sqlQuery = "DROP TABLE lan";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};
