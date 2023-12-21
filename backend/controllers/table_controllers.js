import express from "express";
import {
  createUserTable,
  deleteUserTable,
  createPersonalTable,
  deletePersonalTable,
  createContactTable,
  deleteContactTable,
  createEduTable,
  deleteEduTable,
} from "../services/table_services.js";

const tableRouter = express.Router();

//creating user table
tableRouter.post("/user/create", async (req, res) => {
  const newTable = await createUserTable();
  res.send(newTable);
});

//deleting user table
tableRouter.delete("/user/delete", async (req, res) => {
  const newTable = await deleteUserTable();
  res.send(newTable);
});

//creating personal table
tableRouter.post("/personal/create", async (req, res) => {
  const newTable = await createPersonalTable();
  res.send(newTable);
});

//deleting personal table
tableRouter.delete("/personal/delete", async (req, res) => {
  const newTable = await deletePersonalTable();
  res.send(newTable);
});

//creating contact table
tableRouter.post("/contact/create", async (req, res) => {
  const newTable = await createContactTable();
  res.send(newTable);
});

//deleting contact table
tableRouter.delete("/contact/delete", async (req, res) => {
  const newTable = await deleteContactTable();
  res.send(newTable);
});

//creating edu table
tableRouter.post("/edu/create", async (req, res) => {
  const newTable = await createEduTable();
  res.send(newTable);
});

//deleting edu table
tableRouter.delete("/edu/delete", async (req, res) => {
  const newTable = await deleteEduTable();
  res.send(newTable);
});

export default tableRouter;
