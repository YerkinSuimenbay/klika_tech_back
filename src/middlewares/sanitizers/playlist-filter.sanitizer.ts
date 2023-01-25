import { parseIntSanitizer } from "./parse-int.sanitizer";

export const playlistFilterSanitizer = [
  parseIntSanitizer("singer"),
  parseIntSanitizer("genre"),
  parseIntSanitizer("year"),
];
