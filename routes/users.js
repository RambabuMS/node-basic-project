import express from "express";
const router = express.Router();
import { createUser } from "../helper.js";
import bcrypt from "bcrypt";

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  console.log({ salt, hashPassword });
  return hashPassword;
}

router.post("/signup", async function (request, response) {
  // db.users.insertOne(data)
  const { username, password } = request.body;
  const hashPassword = await genPassword(password);
  const newUser = {
    username: username,
    password: hashPassword,
  };

  const result = await createUser(newUser);
  response.send(result);
});

export const usersRouter = router;
