import express from "express";
import bodyParser from "body-parser";
import {
  createContact,
  getAllContact,
  contactUpdate,
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
  const newcontact = await createContact(
    user_id,
    m_code,
    m_number,
    w_code,
    w_number,
    address_lane,
    city,
    post_code,
    country
  );
  res.send(newcontact);
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

export default contactRouter;
