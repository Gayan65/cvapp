import mySqlPool from "../models/db.js";

//Creating Other sql
export const createOther = async (user_id, topic, content) => {
  const sqlQuery = "INSERT INTO other (user_id, topic, content) VALUES (?,?,?)";
  const [rows] = await mySqlPool.query(sqlQuery, [user_id, topic, content]);

  return rows;
};

//Getting all other info belongs to user
export const allUserOther = async (user_id) => {
  const sqlQuery = "SELECT * FROM other WHERE user_id = ?";
  const [rows] = await mySqlPool.query(sqlQuery, [user_id]);
  return rows;
};
