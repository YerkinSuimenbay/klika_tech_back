import { check } from "express-validator";
import { PlaylistSort } from "../../enums";

export const sortSanitizer = check("sort").customSanitizer((sort: string) => {
  if (!sort) return "";

  sort = sort.toLowerCase();
  if (
    sort !== PlaylistSort.signer &&
    sort !== PlaylistSort.song &&
    sort !== PlaylistSort.genre &&
    sort !== PlaylistSort.year
  )
    return "";

  return sort;
});
