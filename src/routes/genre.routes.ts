import { getGenres } from "./../controllers/genre.controller";
import express from "express";

const router = express.Router();

router.route("/").get(getGenres);

export default router;
