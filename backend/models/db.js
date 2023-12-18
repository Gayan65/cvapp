//IMPORTING PACKAGES
import mysql from "mysql2/promise";
import "dotenv/config";

//GETTING ENV VARIABLES
const url = process.env.DATABASE_URL;

//CREATING CONNECTION

const mySqlPool = mysql.createPool(url);

export default mySqlPool;
