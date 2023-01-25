import express from "express";
import {
  getSingers,
  getSingleSinger,
} from "./../controllers/singer.controller";

const router = express.Router();

router.route("/").get(getSingers);
router.route("/:id").get(getSingleSinger);

export default router;