import express from "express";
import { parseIntSanitizer } from "../middlewares/sanitizers";
import { getGenres, getSingleGenre } from "./../controllers/genre.controller";

const router = express.Router();

router
  .route("/")
  .get(
    [parseIntSanitizer("singer", 0), parseIntSanitizer("year", 0)],
    getGenres
  );
router.route("/:id").get(getSingleGenre);

export default router;
