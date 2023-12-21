import mySqlPool from "../models/db.js";

//Getting all personal sql
export const getAllPersonal = async () => {
  const sqlQuery = "SELECT * FROM personal";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//Creating personal sql
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

// Updating a personal from the user ID SQl
export const personalUpdate = async (moto, description, image, user_id) => {
  const sqlQuery =
    "UPDATE personal SET moto = ?, description = ?, image = ? WHERE user_id = ?;";
  const [rows] = await mySqlPool.query(sqlQuery, [
    moto,
    description,
    image,
    user_id,
  ]);
  return rows;
};
