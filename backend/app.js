// IMPORTING PACKAGES
import express from "express";

//IMPORTING ENV VARIABLES
import "dotenv/config";

const port = process.env.PORT;
const app = express();

app.listen(port, () => {
  console.log(`Server is running in port ${port} successfully`);
});
