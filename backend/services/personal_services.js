import mySqlPool from "../models/db.js";

//Getting all users sql
export const getAllPersonal = async () => {
  const sqlQuery = "SELECT * FROM personal";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//Creating user sql
export const createPersonal = async (user_id, moto, description, image) => {
  const sqlQuery =
    "INSERT INTO personal (user_id, moto, description, image) VALUES (?,?,?,?)";
  const rows = await mySqlPool.query(sqlQuery, [
    user_id,
    moto,
    description,
    image,
  ]);

  return rows;
};
