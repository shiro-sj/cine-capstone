import express from "express";
import pg from "pg";


const app = express();
const port = 8081;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "capstone",
  password: "123",
  port: 5432,
});
db.connect();



app.get("/adduser", (req,res) => {
  console.log(req,body) 
  res.send("Response Received: " + req.body);
});



