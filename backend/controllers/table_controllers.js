import express from "express";
import {
  createUserTable,
  deleteUserTable,
  createPersonalTable,
  deletePersonalTable,
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
export default tableRouter;
