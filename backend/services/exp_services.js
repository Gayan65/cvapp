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
