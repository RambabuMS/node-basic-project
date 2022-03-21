//const express = require("express");// "type" : "commonjs",
import express from "express"; // "type" : "module"
import { MongoClient } from "mongodb";
import { moviesRouter } from "./routes/movies.js";
import { usersRouter } from "./routes/users.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

console.log(process.env);
console.log(process.env.MONGO_URL);
const app = express();

const PORT = process.env.PORT;

app.use(cors()); // cors - third party middleware
//middle ware -> Intercept -> converting body to Json
app.use(express.json()); // Inbuild middleware

const MONGO_URL = process.env.MONGO_URL;
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌️😊");
  return client;
}
export const client = await createConnection();

//as it runs in default port no need to mention the port
app.get("/", function (request, response) {
  response.send("Hello World");
});

app.use("/movies", moviesRouter);

app.use("/users", usersRouter);

app.listen(PORT, () => console.log("Server is started in ", PORT));
