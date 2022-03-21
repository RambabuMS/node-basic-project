import express from "express";
import { auth } from "../middleware/auth.js";
const router = express.Router();
import {
  createMovies,
  getAllMovies,
  getMoviesById,
  updateMovieById,
  deleteMovieById,
} from "../helper.js";

// find - cursor - pagination -> convert to Array - toArray();
router.get("/", auth, async function (request, response) {
  //response.send(movies);
  const movies = await getAllMovies();
  response.send(movies);
});

router.get("/:id", auth, async function (request, response) {
  console.log(request.params);
  const { id } = request.params;
  //const movie = movies.find((mv) => mv.id === id);
  const movie = await getMoviesById(id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "No Such movie found" });
});

router.delete("/:id", async function (request, response) {
  console.log(request.params);

  const { id } = request.params;
  //const movie = movies.find((mv) => mv.id === id);
  const result = await deleteMovieById(id);
  response.send(result);
});

router.put("/:id", async function (request, response) {
  console.log(request.params);
  //db.movies.updateOne({ id : id}, {$set : updateData})
  const { id } = request.params;
  const updateData = request.body;
  //const movie = movies.find((mv) => mv.id === id);
  const result = await updateMovieById(id, updateData);
  response.send(result);
});

router.post("/", async function (request, response) {
  // db.movies.insertMany(data)
  const data = request.body;
  console.log(data);
  const result = await createMovies(data);
  response.send(result);
});

export const moviesRouter = router;
