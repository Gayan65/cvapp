import mySqlPool from "../models/db.js";

//Creating edu sql
export const createEdu = async (
  user_id,
  program,
  program_name,
  institution,
  address,
  s_month,
  s_year,
  e_month,
  e_year,
  about
) => {
  const sqlQuery =
    "INSERT INTO edu (user_id, program, program_name, institution, address, s_month, s_year, e_month, e_year, about) VALUES (?,?,?,?,?,?,?,?,?,?)";
  const [rows] = await mySqlPool.query(sqlQuery, [
    user_id,
    program,
    program_name,
    institution,
    address,
    s_month,
    s_year,
    e_month,
    e_year,
    about,
  ]);

  return rows;
};

//Getting all edu sql
export const getAllEdu = async () => {
  const sqlQuery = "SELECT * FROM edu";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

// Updating a edu from the EDU ID SQl
export const eduUpdate = async (
  program,
  program_name,
  institution,
  address,
  s_month,
  s_year,
  e_month,
  e_year,
  about,
  edu_id
) => {
  const sqlQuery =
    "UPDATE edu SET program = ?, program_name = ?, institution = ?, address = ?, s_month = ?, s_year = ?, e_month = ?, e_year = ?, about = ? WHERE edu_id = ?;";
  const [rows] = await mySqlPool.query(sqlQuery, [
    program,
    program_name,
    institution,
    address,
    s_month,
    s_year,
    e_month,
    e_year,
    about,
    edu_id,
  ]);
  return rows;
};

// Deleting a edu from the edu_id SQl
export const eduDelete = async (edu_id) => {
  const sqlQuery = "DELETE FROM edu WHERE edu_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [edu_id]);
  return rows;
};

//Getting all Edu belongs to user
export const getAllEduUser = async (user_id) => {
  const sqlQuery = "SELECT * FROM edu WHERE user_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [user_id]);
  return rows;
};

//Getting all Edu belongs to user
export const getEduEduId = async (edu_id) => {
  const sqlQuery = "SELECT * FROM edu WHERE edu_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [edu_id]);
  return rows;
};
