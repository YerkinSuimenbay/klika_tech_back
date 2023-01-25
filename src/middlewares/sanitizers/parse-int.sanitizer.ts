import { check } from "express-validator";

export const parseIntSanitizer = (str: string, defaultValue = 0) =>
  check(str).isInt().toInt().default(defaultValue);
