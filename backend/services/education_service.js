import mySqlPool from "../models/db.js";

//Creating user sql
export const createEdu = async (
  user_id,
  program,
  program_name,
  institution,
  s_month,
  s_year,
  e_month,
  e_year,
  about
) => {
  const sqlQuery =
    "INSERT INTO edu (user_id, program, program_name, institution, s_month, s_year, e_month, e_year, about) VALUES (?,?,?,?,?,?,?,?,?)";
  const [rows] = await mySqlPool.query(sqlQuery, [
    user_id,
    program,
    program_name,
    institution,
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
