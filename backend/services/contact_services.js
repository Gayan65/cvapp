import mySqlPool from "../models/db.js";

//Creating contact sql
export const createContact = async (
  user_id,
  m_code,
  m_number,
  w_code,
  w_number,
  address_lane,
  city,
  post_code,
  country
) => {
  const sqlQuery =
    "INSERT INTO contact (user_id, m_code, m_number, w_code, w_number, address_lane, city, post_code, country) VALUES (?,?,?,?,?,?,?,?,?)";
  const [rows] = await mySqlPool.query(sqlQuery, [
    user_id,
    m_code,
    m_number,
    w_code,
    w_number,
    address_lane,
    city,
    post_code,
    country,
  ]);

  return rows;
};

//Getting all contact sql
export const getAllContact = async () => {
  const sqlQuery = "SELECT * FROM contact";
  const [rows] = await mySqlPool.query(sqlQuery);
  return rows;
};
