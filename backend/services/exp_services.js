import mySqlPool from "../models/db.js";

//Creating exp sql
export const createExp = async (
  user_id,
  position,
  employer,
  address,
  s_month,
  s_year,
  e_month,
  e_year,
  task
) => {
  const sqlQuery =
    "INSERT INTO exp (user_id, position, employer, address, s_month, s_year, e_month, e_year, task) VALUES (?,?,?,?,?,?,?,?,?)";
  const [rows] = await mySqlPool.query(sqlQuery, [
    user_id,
    position,
    employer,
    address,
    s_month,
    s_year,
    e_month,
    e_year,
    task,
  ]);

  return rows;
};

//Getting all exp sql
export const getAllExp = async () => {
  const sqlQuery = "SELECT * FROM exp";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

// Updating a exp from the EXP ID SQl
export const expUpdate = async (
  position,
  employer,
  address,
  s_month,
  s_year,
  e_month,
  e_year,
  task,
  exp_id
) => {
  const sqlQuery =
    "UPDATE exp SET position = ?, employer = ?, address = ?, s_month = ?, s_year = ?, e_month = ?, e_year = ?, task = ? WHERE exp_id = ?;";
  const [rows] = await mySqlPool.query(sqlQuery, [
    position,
    employer,
    address,
    s_month,
    s_year,
    e_month,
    e_year,
    task,
    exp_id,
  ]);
  return rows;
};
