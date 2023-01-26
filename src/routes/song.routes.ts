import express from "express";
import { getYears } from "../controllers";

const router = express.Router();

// router.route("/").get(getSongs);
router.route("/years").get(getYears);

export default router;
