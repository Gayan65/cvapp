import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import {
  createContact,
  getAllContact,
  contactUpdate,
  getContact,
} from "../services/contact_services.js";

const contactRouter = express.Router();
contactRouter.use(bodyParser.urlencoded({ extended: false }));

//Creating contact info
contactRouter.post("/create", async (req, res) => {
  const {
    user_id,
    m_code,
    m_number,
    w_code,
    w_number,
    address_lane,
    city,
    post_code,
    country,
  } = req.body;

  //Decoding the jwt token
  const decodedToken = jwt.verify(user_id, process.env.JWT_KEY);
  const id = decodedToken.userId;

  const newcontact = await createContact(
    id,
    m_code,
    m_number,
    w_code,
    w_number,
    address_lane,
    city,
    post_code,
    country
  );
  if (newcontact.affectedRows > 0) {
    res.status(200).json({
      success: true,
      message: "Information added Successfully!",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Information is not added!",
    });
  }
});

// Getting all contact info
contactRouter.get("/all", async (req, res) => {
  const allContacts = await getAllContact();
  res.send(allContacts);
});

//Updating contact info
contactRouter.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const {
    m_code,
    m_number,
    w_code,
    w_number,
    address_lane,
    city,
    post_code,
    country,
  } = req.body;
  const allContacts = await contactUpdate(
    m_code,
    m_number,
    w_code,
    w_number,
    address_lane,
    city,
    post_code,
    country,
    id
  );
  res.send(allContacts);
});

// Getting a specific contact information from a user_id
contactRouter.get("/find/:id", async (req, res) => {
  const jwtId = req.params.id;
  //Decoding the jwt token
  const decodedToken = jwt.verify(jwtId, process.env.JWT_KEY);
  const id = decodedToken.userId;
  const contactInfo = await getContact(id);
  if (contactInfo.length > 0) {
    res.status(200).json({
      success: true,
      message: "information found successfully!",
      contact: contactInfo,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "information can not be found!",
    });
  }
});

export default contactRouter;
