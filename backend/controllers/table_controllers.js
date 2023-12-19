import express from "express";
import {
  createUserTable,
  deleteUserTable,
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
export default tableRouter;
