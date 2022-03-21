import express from "express";
const router = express.Router();
import { createUser, getUserByName } from "../helper.js";
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

router.post("/login", async function (request, response) {
  // db.users.insertOne(data)
  const { username, password } = request.body;
  // db.users.findOne({username: "aara"})
  const userFromDB = await getUserByName(username);
  console.log(userFromDB);

  if (!userFromDB) {
    response.status(401).send({ message: "Invalid credentials" });
  } else {
    const storedPassword = userFromDB.password; // hashed password
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);

    if (isPasswordMatch) {
      response.send({ message: "Successful login" });
    } else {
      response.status(401).send({ message: "Invalid credentials" });
    }

    response.send(userFromDB);
  }
});

export const usersRouter = router;
