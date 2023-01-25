import { check } from "express-validator";
import { parseIntSanitizer } from "./parse-int.sanitizer";

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

export const paginationSanitizer = [
  parseIntSanitizer("limit", DEFAULT_LIMIT),
  parseIntSanitizer("offset", DEFAULT_OFFSET),
];
