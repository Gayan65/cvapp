import mySqlPool from "../models/db.js";

//creating user table function
export const createUserTable = async () => {
  const sqlQuery =
    "CREATE TABLE users (user_id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL, fname VARCHAR(50) NOT NULL, lname VARCHAR(50) NOT NULL)";
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
    "CREATE TABLE personal (personal_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, moto VARCHAR(100), description VARCHAR(600) NOT NULL, image LONGBLOB, INDEX `idx_user` (user_id), CONSTRAINT `fk_character_user` FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT)";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//deleting user table function
export const deletePersonalTable = async () => {
  const sqlQuery = "DROP TABLE personal";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};
