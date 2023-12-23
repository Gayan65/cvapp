import mySqlPool from "../models/db.js";

//Getting all language sql
export const getAllLanguage = async () => {
  const sqlQuery = "SELECT * FROM lan";
  const [rows] = await mySqlPool.query(sqlQuery);

  return rows;
};

//Creating language sql
export const createLanguage = async (user_id, l_name, l_pro) => {
  const sqlQuery = "INSERT INTO lan (user_id, l_name, l_pro) VALUES (?,?,?)";
  const [rows] = await mySqlPool.query(sqlQuery, [user_id, l_name, l_pro]);

  return rows;
};

//lan_id, user_id, l_name, l_pro,
