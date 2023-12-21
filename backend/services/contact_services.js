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

// Updating a contact from the user ID SQl
export const contactUpdate = async (
  m_code,
  m_number,
  w_code,
  w_number,
  address_lane,
  city,
  post_code,
  country,
  user_id
) => {
  const sqlQuery =
    "UPDATE contact SET m_code = ?, m_number = ?, w_code = ?, w_number = ?, address_lane = ?, city = ?, post_code = ?, country = ? WHERE user_id = ?;";
  const [rows] = await mySqlPool.query(sqlQuery, [
    m_code,
    m_number,
    w_code,
    w_number,
    address_lane,
    city,
    post_code,
    country,
    user_id,
  ]);
  return rows;
};
