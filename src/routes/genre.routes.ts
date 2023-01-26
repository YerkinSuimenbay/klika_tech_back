import express from "express";
import { getGenres, getSingleGenre } from "../controllers";
import { parseIntSanitizer } from "../middlewares/sanitizers";

const router = express.Router();

router
  .route("/")
  .get(
    [parseIntSanitizer("singer", 0), parseIntSanitizer("year", 0)],
    getGenres
  );

router.route("/:id").get(getSingleGenre);

export default router;
