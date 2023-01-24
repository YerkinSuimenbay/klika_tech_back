import { getSingers } from "./../controllers/singer.controller";
import express from "express";

const router = express.Router();

router.route("/").get(getSingers);

export default router;
